import React from "react";
import { store } from "./redux/store";
import { Route, Routes, Navigate } from "react-router-dom";
import { Products } from "./components/Products";
import { Cart } from "./components/Cart";
import { Provider } from "react-redux";
import { ContentLayout } from "./components/ContentLayout";
import { GlobalLayout } from "./components/GlobalLayout";
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route path="/" element={<ContentLayout />}>
            <Route index element={<Navigate to="/products/?category=209" />} />
            <Route path="/products" element={<Products />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;
