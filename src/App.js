import React from "react";
import { WalletProvider } from "./context/walletContext";
import Exchange from "./pages/Exchange";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Transfer from "./pages/Transfer";
import HomePage from "./pages/HomePage";
import ShopkeeperIntialization from "./pages/ShopkeeperIntialization";
import PlatformIntialization from "./pages/PlatformIntialization";

const App = () => {
  return (
    <WalletProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/shopkeeper" element={<ShopkeeperIntialization />} />
          <Route path="/platform" element={<PlatformIntialization />} />
        </Routes>
      </Router>
    </WalletProvider>
  );
};
export default App;
