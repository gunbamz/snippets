import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Market from './Market';
import Navigation from './Navigation';
import Home from './Home';
import Context from './Context';
import Info from './Info';
import MarketAnalysis from './MarketAnalysis';
import SpotAnalysis from './SpotAnalysis';
import BlockChainWrapper from './BlockChainWrapper';

const App = () => {
  const [value, setValue] = useState(null);
  return (
    <div>
      <BrowserRouter>
        <Context.Provider value={{value, setValue}}>
          <Navigation />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/market' element={<Market />} />
            <Route path='/analysis' element={<MarketAnalysis />} />
            <Route path='/spot' element={<SpotAnalysis />} />
            <Route path='/blocknetwork' element={<BlockChainWrapper />} />
            <Route path='/exinfo' element={<Info />} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;