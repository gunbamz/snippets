import React, { useState, useEffect } from 'react';
import * as ethers from 'ethers';
import { useLocation } from 'react-router-dom';
import MainExchangePage from './components/MainExchangePage';
import Binance from './components/Binance';

const BlockChainWrapper = (props) => {
  const [showChildren, setShowChildren] = useState(false);
  const [symbol, setSymbol] = useState(null);
  const [provider, setProvider] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [account, setAccount] = useState([]);
  const [factory, setFactory] = useState(null);
  const [router, setRouter] = useState(null);
  let location = useLocation();
  const ssymbol = location.state.pair; 

  const routerAddress = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
  const factoryAddress = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73';
  const privateKey = '6342ce27b5821a7537ee05a926b9e59d7a5d62b4505e543e478766613ff5bfc6';
  //const privateKey = '2a32d20e64953ab954a28c000e07c688a90289513542d451da7642aa37b8b3ba';
  const init = async () => {
    setSymbol(ssymbol);
    const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    //const provider = new ethers.providers.JsonRpcProvider('https://solana-api.projectserum.com');
    //const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.defibit.io/');
    //const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');
    const wallet = new ethers.Wallet(privateKey);
    const account = wallet.connect(provider);
    const factory = new ethers.Contract(
      factoryAddress,
      ['event PairCreated(address indexed token0, address indexed token1, address pair, uint)'],
      account
    );
    const router = new ethers.Contract(
    routerAddress,
    [
        'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
        'function getAmountsIn(uint amountOut, address[] memory path) public view virtual override returns (uint[] memory amounts)',
        'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
    ],
    account
    );
    setWallet(wallet);
    setProvider(provider);
    setAccount(account);
    setFactory(factory);
    setRouter(router);
  };
  const delayShow = () => {
    setShowChildren(true);
  }
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
  let timer = setTimeout(()=> delayShow(), 3000);
    return () => {
      clearTimeout(timer);
    }
  }, []);
  return (
    <div>
      {showChildren && <MainExchangePage routerAddress={routerAddress} pair={symbol} wallet={wallet} account={account} factory= {factory} router= {router} provider= {provider} />}
    </div>
  );
}

export default BlockChainWrapper;

