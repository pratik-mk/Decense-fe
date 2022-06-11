import React from "react";
import { useWallet } from "../context/walletContext";
import { PublicKey } from "@solana/web3.js";
import { sendRecieveTokenIx } from "../utils/sendRecieveToken";

const Transfer = () => {
  const { pubKey } = useWallet();
  return (
    <div>
      <hr />
      <h1>Transfer Component</h1>
      <button
        onClick={() =>
          sendRecieveTokenIx(
            new PublicKey("Ba6de1dGVK1HMDhBM4RbbGnFbPmwG1QR1VNtFUFdon6b"),
            pubKey
          )
        }
      >
        Send Or Recieve Token
      </button>
      <br />
      <br />
      <hr />
    </div>
  );
};

export default Transfer;
