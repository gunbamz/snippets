import React, { useState, useEffect } from 'react';
import * as ethers from 'ethers';
import { useLocation } from 'react-router-dom';
import MainExchangePagee from './components/MainExchangePagee';

const BlockChainWrapperr = (props) => {
  const [showChildren, setShowChildren] = useState(false);
  const [symbol, setSymbol] = useState(null);
  const [provider, setProvider] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [account, setAccount] = useState([]);
  const [pancakeFactory, setPancakeFactory] = useState(null);
  const [pancakeRouter, setPancakeRouter] = useState(null);
  const [kyberFactory, setKyberFactory] = useState(null);
  const [kyberRouter, setKyberRouter] = useState(null);
  let location = useLocation();
  const symbol = location.state.pair; 
  const pancakeRouterAddress = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
  const pancakeFactoryAddress = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73';
  const kyberRouterAddress = '0x78df70615ffc8066cc0887917f2Cd72092C86409';
  const kyberFactoryAddress = '0x878dFE971d44e9122048308301F540910Bbd934c';
  const privateKey = '6342ce27b5821a7537ee05a926b9e59d7a5d62b4505e543e478766613ff5bfc6';
  //const privateKey = '2a32d20e64953ab954a28c000e07c688a90289513542d451da7642aa37b8b3ba';
  const init = async () => {
    setSymbol(location.state.pair);
    const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    //const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');
    const wallet = new ethers.Wallet(privateKey);
    const account = wallet.connect(provider);
    const pancakeFactoryContract = new ethers.Contract(
      pancakeFactoryAddress,
      ['event PairCreated(address indexed token0, address indexed token1, address pair, uint)'],
      account
    );
    const kyberFactoryContract = new ethers.Contract(
      kyberFactoryAddress,
      [
        'function getPools(IERC20 token0, IERC20 token1) external override view returns (address[] memory _tokenPools)',
        'function getFeeConfiguration() external override view returns (address _feeTo, uint16 _governmentFeeBps)',
        'function allPoolsLength() external override view returns (uint256)'
      ],
      account
    );
    const pancakeRouterContract = new ethers.Contract(
    pancakeRouterAddress,
    [
        'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
        'function getAmountsIn(uint amountOut, address[] memory path) public view virtual override returns (uint[] memory amounts)',
        'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
    ],
    account
    );
    const kyberRouterContract = new ethers.Contract(
    kyberRouterAddress,
    [
      'function getAmountsOut(uint256 amountIn, address[] calldata poolsPath, IERC20[] calldata path) external override view returns (uint256[] memory amounts)',
      'function getAmountsIn(uint256 amountOut, address[] calldata poolsPath, IERC20[] calldata path) external override view returns (uint256[] memory amounts)',
      'function swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] memory poolsPath, IERC20[] memory path, address to, uint256 deadline) public virtual override returns (uint256[] memory amounts)'
    ],
    account
    );
    setWallet(wallet);
    setProvider(provider);
    setAccount(account);
    setPancakeFactory(pancakeFactoryContract);
    setPancakeRouter(pancakeRouterContract);
    setKyberRouter(kyberRouterContract);
    setKyberFactory(kyberFactoryContract);
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
      {showChildren && <MainExchangePagee pair= {symbol} wallet= {wallet} account= {account} pancakeFactory= {pancakeFactory} pancakeRouter= {pancakeRouter} provider= {provider} kyberFactory={kyberFactory} kyberRouter={kyberRouter} />}
    </div>
  );
}

export default BlockChainWrapperr;
