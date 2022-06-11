import React, { useState } from "react";
import Button from "@mui/material/Button";
import { initializeSK } from "../utils/initializeShopKeeper";
import { useWallet } from "../context/walletContext";
import TextField from "@mui/material/TextField";

const ShopkeeperIntialize = () => {
  const { pubKey } = useWallet();
  const [skValues, setSkValues] = useState({
    market_valuation: "",
    supply: "",
  });

  const handleIntializeSK = () => {
    initializeSK(
      parseInt(skValues.market_valuation),
      parseInt(skValues.supply),
      pubKey
    );
  };
  console.log(skValues, "skvalues");

  return (
    <div>
      <hr />
      <h1>ShopkeeperIntialize Component</h1>
      {/* create input boxes for market valuatuion and supply, and send in args */}
      <TextField
        type="number"
        label="Market Valuation"
        onChange={(e) =>
          setSkValues({ ...skValues, market_valuation: e.target.value })
        }
      />
      <TextField
        type="number"
        label="Token Supply"
        onChange={(e) => setSkValues({ ...skValues, supply: e.target.value })}
      />
      <Button variant="contained" onClick={handleIntializeSK}>
        Initialize Shopkeeper
      </Button>
      <hr />
    </div>
  );
};

export default ShopkeeperIntialize;
