import "./App.css";
import { Products } from "./Products";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { Order } from "./Order";
import { AxiosShopApi } from "./api/AxiosProductsApi";
import { TelegramMainButton } from "./components/TelegramMainButton";

function App() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const tgApp = window.Telegram.WebApp;

  useEffect(() => {
    async function makeRequest() {
      const api = new AxiosShopApi("https://aromostore.ru");
      const products = await api.getProducts();
      const productsWithCount = products.map((product) => ({
        ...product,
        count: 0,
      }));
      setProducts(productsWithCount);
    }

    makeRequest();
    tgApp.ready();
    // eslint-disable-next-line
  }, []);

  let totalSumOrder = useRef(0);

  /*  useEffect(() => {
    tgApp.MainButton.setText(
      "Оформить заказ: " + totalSumOrder.current + " руб."
    );
    if (totalSumOrder.current > 0 && !tgApp.MainButton.isVisible) {
      tgApp.MainButton.show();
    }
    if (totalSumOrder.current <= 0 && tgApp.MainButton.isVisible)
      tgApp.MainButton.hide();

    // eslint-disable-next-line
  }, [products]);*/

  // callback issue
  useEffect(() => {
    tgApp.MainButton.onClick(() => navigate("/order"));
    //  return tgApp.MainButton.offClick(() => navigate("/order"));
    // eslint-disable-next-line
  }, []);

  function onChangeCount(id, options = { inc: 1 }) {
    const product = products.find((product) => product.id === id);
    product.count += options.inc;
    setProducts([...products]);
    totalSumOrder.current += product.price * options.inc;
  }

  const womanProducts = products.filter(
    (product) => product.categoryId === 209
  );

  const manProducts = useMemo(
    () => products.filter((product) => product.categoryId === 212),
    // eslint-disable-next-line
    []
  );

  const orderProducts = products.filter((product) => product.count > 0);

  return (
    <div className="pt-10">
      <div className="container max-w-screen-md m-auto font-montserrat">
        <Routes>
          <Route
            path="/order"
            element={
              <Order
                products={orderProducts}
                totalSumOrder={totalSumOrder.current}
              />
            }
          />
          <Route
            index
            path="/woman"
            element={
              <Products
                data={womanProducts}
                onChangeCount={onChangeCount}
                title="Женские духи"
              />
            }
          />
          <Route
            path="/man"
            element={
              <Products
                data={manProducts}
                onChangeCount={onChangeCount}
                title="Мужские духи"
              />
            }
          />
          <Route path="*" element={<Navigate to="/woman" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
