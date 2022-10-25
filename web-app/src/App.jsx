import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Products } from "./Products";
import { Order } from "./Order";
import "./App.css";

function App() {
  useEffect(() => {
    window.Telegram.WebApp.ready();
  }, []);

  return (
    <div className="pt-10">
      <div className="container max-w-screen-md m-auto font-montserrat">
        <Routes>
          <Route path="/order" element={<Order />} />
          <Route
            index
            path="/woman"
            element={<Products categoryId={209} title="Женские духи" />}
          />
          <Route
            path="/man"
            element={<Products categoryId={212} title="Мужские духи" />}
          />
          <Route path="*" element={<Navigate to="/woman" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
