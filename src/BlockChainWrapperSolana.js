import React, { useState, useEffect } from 'react';
import * as ethers from 'ethers';
import { useLocation } from 'react-router-dom';
import MainExchangePageSolana from './components/MainExchangePageSolana';
import Binance from './components/Binance';

const BlockChainWrapperSolana = (props) => {
  const [showChildren, setShowChildren] = useState(false);
  const [provider, setProvider] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [account, setAccount] = useState([]);

  let location = useLocation();
  const symbol = location.state.pair; 

  const privateKey = '3HrNy9y2Df2iZgRXamNq9Z8kvfyT16LMp1HBuazNSrzGkp3n4tCUBGgpsNNK5WqPH2BiQxu5BgPzYXADMfWfu6aL';
  const init = async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://api.mainnet-beta.solana.com');
    //const provider = new ethers.providers.JsonRpcProvider('https://solana-api.projectserum.com');
    const wallet = new ethers.Wallet(privateKey);
    const account = wallet.connect(provider);
    setWallet(wallet);
    setProvider(provider);
    setAccount(account);
  };
  const delayShow = () => {
    setShowChildren(true);
  }
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
  let timer = setTimeout(()=> delayShow(), 10000);
    return () => {
      clearTimeout(timer);
    }
  }, []);
  return (
    <div>
      {showChildren && <MainExchangePageSolana wallet= {wallet} account= {account} provider= {provider} />}
    </div>
  );
}
export default BlockChainWrapperSolana;