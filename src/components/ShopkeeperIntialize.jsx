import React from "react";
import { initializeSK } from "../utils/initializeShopKeeper";
import { useWallet } from "../context/walletContext";

const ShopkeeperIntialize = () => {
  const { pubKey } = useWallet();
  return (
    <div>
      <hr />
      <h1>ShopkeeperIntialize Component</h1>
      {/* create input boxes for market valuatuion and supply, and send in args */}
      <button onClick={() => initializeSK(pubKey)}>
        Initialize Shopkeeper
      </button>
      <hr />
    </div>
  );
};

export default ShopkeeperIntialize;
