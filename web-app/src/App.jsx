import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Products } from "./components/Products";
import { Order } from "./components/Order";
import "./App.css";

function App() {
  useEffect(() => {
    window.Telegram.WebApp.ready();
  }, []);

  return (
    <div className="pt-10">
      <div className="container max-w-screen-md m-auto font-montserrat">
        <Routes>
          <Route path="/" element={<Navigate to="/products/?category=209" />} />
          <Route path="/order" element={<Order />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
