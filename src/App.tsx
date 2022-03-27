import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GoodsList } from './components/GoodsList/GoodsList';
import { Product } from './components/Product/Product';
import './App.scss';

export const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App__content">
        <div className="App__content-container">
          <Routes>
            <Route path="/" element={<GoodsList />} />
            <Route path="product" element={<Product />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
