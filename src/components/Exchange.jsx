import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { exchangeIx } from "../utils/exchange";
import { useWallet } from "../context/walletContext";
import { PublicKey } from "@solana/web3.js";
import { getTokenByName } from "../services/api";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const Exchange = () => {
  const { pubKey } = useWallet();
  const [skDetails, setSkDetails] = useState({
    skName: "",
    skAddress: "",
  });
  const [exchangeValues, setExchangeValues] = useState({
    askPrice: "",
    quantity: "",
  });
  let exchangeTX = "";

  const getSKAddress = async (skName) => {
    try {
      //make API call
      const res = await getTokenByName(skName);
      setSkDetails({ ...skDetails, skAddress: res.address });
    } catch (e) {
      console.log(e, "exchange componennt API error");
    }
  };

  const handleExchange = () => {
    const exchangeTxRes = exchangeIx(
      exchangeValues.askPrice,
      exchangeValues.quantity,
      new PublicKey(skDetails.skDetails),
      pubKey
    );
    exchangeTX = exchangeTxRes;
    console.log(exchangeIx, "exchangeTx");
  };

  return (
    <div>
      <hr />
      <h1>Exchange Component</h1>
      <h3>GET SHOPKEEPER PUBLIC KEY</h3>
      <TextField
        type="text"
        label="Shopkeeper Name"
        onChange={(e) => setSkDetails({ ...skDetails, skName: e.target.value })}
      />
      <Button
        variant="contained"
        onClick={() => getSKAddress(skDetails.skName)}
      >
        Get SK Address
      </Button>
      <br />
      {/* create input boxes for ask and quantity, and send in args */}
      {/* Make a backend api call and get the shopkeepers address and put it in new PublicKey("PASTEHERE") */}
      <TextField label="TOKEN ADDRESS" value={skDetails.skAddress} />
      <TextField
        type="number"
        label="Ask Price"
        onChange={(e) =>
          setExchangeValues({ ...exchangeValues, askPrice: e.target.value })
        }
      />
      <TextField
        type="number"
        label="Quantity"
        onChange={(e) =>
          setExchangeValues({ ...exchangeValues, quantity: e.target.value })
        }
      />
      <Button onClick={handleExchange}>Exchange token</Button>
      <Typography>{exchangeTX}</Typography>
      <hr />
    </div>
  );
};

export default Exchange;
