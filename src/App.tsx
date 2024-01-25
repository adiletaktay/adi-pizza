import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';

import './scss/app.scss';

const Cart = React.lazy(() => import(/*webpackChunkName:"Cart"*/ './pages/Cart'));
const NotFound = React.lazy(() => import(/*webpackChunkName:"NotFound"*/ './pages/NotFound'));
const FullPizza = React.lazy(() => import(/*webpackChunkName:"FullPizza"*/ './pages/FullPizza'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route 
          path="Cart" 
          element={
            <Suspense fallback={<div>Идёт загрузка корзины ...</div>}>
              <Cart />
            </Suspense>
          } 
        />
        <Route 
          path="Pizza/:id" 
          element={
            <Suspense fallback={<div>Идёт загрузка ...</div>}>
              <FullPizza />
            </Suspense>
          } 
        />
        <Route 
          path="*" 
          element={
            <Suspense fallback={<div>Идёт загрузка ...</div>}>
              <NotFound />
            </Suspense>
          } 
        />
      </Route>
    </Routes>
  );
}

export default App;
