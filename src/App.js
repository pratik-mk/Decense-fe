import React from "react";
import Container from "@mui/material/Container";
import PlatformIntialize from "./components/PlatformIntialize";
import ShopkeeperIntialize from "./components/ShopkeeperIntialize";
import Exchange from "./components/Exchange";
import Transfer from "./components/Transfer";
import ConnectWallet from "./components/ConnectWallet";
import { WalletProvider } from "./context/walletContext";

const App = () => {
  return (
    <WalletProvider>
      <Container>
        <ConnectWallet />
        <PlatformIntialize />
        <ShopkeeperIntialize />
        <Exchange />
        <Transfer />
      </Container>
    </WalletProvider>
  );
};
export default App;
