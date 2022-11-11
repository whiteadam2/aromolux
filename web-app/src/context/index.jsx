import React, { useState } from "react";

export const AppContext = React.createContext({});

export function AppProvider({ children }) {
  const [orders, setOrders] = useState([]);
  return (
    <AppContext.Provider value={{ orders, setOrders }}>
      {children}
    </AppContext.Provider>
  );
}
