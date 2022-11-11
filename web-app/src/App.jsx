import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Products } from "./components/Products";
import { Cart } from "./components/Cart";
import "./App.css";

export const OrdersContext = React.createContext();

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    window.Telegram.WebApp.ready();
  }, []);

  return (
    <OrdersContext.Provider value={{ orders, setOrders }}>
      <div className="pt-10">
        <div className="container max-w-screen-md m-auto font-sans">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/products/?category=209" />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </div>
      </div>
    </OrdersContext.Provider>
  );
}

export default App;
