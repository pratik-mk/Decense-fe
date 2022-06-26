import React from "react";
import Navbar from "../components/Navbar";
import Swap from "../components/swap/Swap";
import ConnectWallet from "../components/ConnectWallet";

const Exchange = () => {
  return (
    <div>
      <Navbar />
      <ConnectWallet />
      <Swap title={"Swap Token"} />
    </div>
  );
};

export default Exchange;
