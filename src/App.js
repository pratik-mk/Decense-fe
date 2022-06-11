import React from "react";
import PlatformIntialize from "./components/PlatformIntialize";
import ShopkeeperIntialize from "./components/ShopkeeperIntialize";
import Exchange from "./components/Exchange";
import Transfer from "./components/Transfer";
import ConnectWallet from "./components/ConnectWallet";
import { WalletProvider } from "./context/walletContext";

const App = () => {
  return (
    <WalletProvider>
      <ConnectWallet />
      <PlatformIntialize />
      <ShopkeeperIntialize />
      <Exchange />
      <Transfer />
    </WalletProvider>
  );
};
export default App;
