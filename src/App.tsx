import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { GlobalPage } from './Components/GlobalPage';
import { Category } from './Components/Category';
import { CategoryCards } from './Components/Category/CategoryCards';
import { Home } from './Components/Home';
import { Login } from './Components/Login';
import { OneCard } from './Components/OneCard';
import { Search } from './Components/Search';
import { Provider } from './hoc/Provider';

function App() {
  return (
    <Provider>
    <Routes>
      <Route path="/" element={<GlobalPage />}>
        <Route index  element={<Navigate to="/products" replace />} />
        <Route path="category" element={<Category />} />
        <Route path="category/:title" element={<CategoryCards />} />
        <Route path="products" element={<Home />} />
        <Route path="products/:id" element={<OneCard />} />
      </Route>
    </Routes>
    </Provider>
  );
}

export default App;
