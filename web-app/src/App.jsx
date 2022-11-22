import React from "react";
import { store } from "./redux/store";
import { Route, Routes, Navigate } from "react-router-dom";
import { Products } from "./components/Products";
import { Cart } from "./components/Cart";
import { Provider } from "react-redux";
import { Layout } from "./components/Layout";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/products/?category=209" />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
