import React from "react";
import { initializePlatform } from "../utils/initializePlatform";
import { useWallet } from "../context/walletContext";
import { Button } from "@mui/material";

const PlatformIntialize = () => {
  const { pubKey } = useWallet();
  return (
    <div>
      <hr />
      <h1>PlatformIntialize Component</h1>
      <Button variant="contained" onClick={() => initializePlatform(pubKey)}>
        Initialize Platform
      </Button>
      <hr />
    </div>
  );
};

export default PlatformIntialize;
