import React from "react";
import Navbar from "../components/Navbar";
import PlatformIntialize from "../components/PlatformIntialize";
import ConnectWallet from "../components/ConnectWallet";

const PlatformIntialization = () => {
  return (
    <div>
      <Navbar />
      <ConnectWallet />
      <PlatformIntialize />
    </div>
  );
};

export default PlatformIntialization;
