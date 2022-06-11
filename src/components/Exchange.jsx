import React from "react";
import { exchangeIx } from "../utils/exchange";
import { useWallet } from "../context/walletContext";
import { PublicKey } from "@solana/web3.js";

const Exchange = () => {
  const { pubKey } = useWallet();
  return (
    <div>
      <hr />
      <h1>Exchange Component</h1>
      {/* create input boxes for ask and quantity, and send in args */}
      {/* Make a backend api call and get the shopkeepers address and put it in new PublicKey("PASTEHERE") */}
      <button
        onClick={() =>
          exchangeIx(
            new PublicKey("Ba6de1dGVK1HMDhBM4RbbGnFbPmwG1QR1VNtFUFdon6b"),
            pubKey
          )
        }
      >
        Exchange token
      </button>
      <br />
      <hr />
    </div>
  );
};

export default Exchange;
