import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Products } from "./components/Products";
import { Cart } from "./components/Cart";
import "./App.css";

function App() {
  useEffect(() => {
    window.Telegram.WebApp.ready();
  }, []);

  return (
    <div className="pt-10">
      <div className="container max-w-screen-md m-auto font-sans">
        <Routes>
          <Route path="/" element={<Navigate to="/products/?category=209" />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
