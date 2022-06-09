import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { GlobalPage } from './Components';
import { Category } from './Components/Category';
import { Home } from './Components/Home';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<GlobalPage />}>
        <Route index  element={<Home />} />
        <Route path="category" element={<Category />}/>
      </Route>
    </Routes>
    </>
  );
}

export default App;
