import React from "react";
import { initializePlatform } from "../utils/initializePlatform";
import { useWallet } from "../context/walletContext";

const PlatformIntialize = () => {
  const { pubKey } = useWallet();
  return (
    <div>
      <hr />
      <h1>PlatformIntialize Component</h1>
      <button onClick={() => initializePlatform(pubKey)}>
        Initialize Platform
      </button>
      <hr />
    </div>
  );
};

export default PlatformIntialize;
