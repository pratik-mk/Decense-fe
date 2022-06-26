import React from "react";
import Navbar from "../components/Navbar";
import ShopkeeperIntialize from "../components/ShopkeeperIntialize";
import ConnectWallet from "../components/ConnectWallet";

const ShopkeeperIntialization = () => {
  return (
    <div>
      <Navbar />
      <ConnectWallet />
      <ShopkeeperIntialize />
    </div>
  );
};

export default ShopkeeperIntialization;
