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
  const [exchangeValues, setExchangeValues] = useState({
    askPrice: "",
    quantity: "",
    shopKeeperPublicKey: "",
    userPublicKey: "",
  });
  let exchangeTX = "";

  // const getSKAddress = async (skName) => {
  //   try {
  //     //make API call
  //     const res = await getTokenByName(skName);
  //     setSkDetails({ ...skDetails, skAddress: res.address });
  //   } catch (e) {
  //     console.log(e, "exchange componennt API error");
  //   }
  // };

  const handleExchange = () => {
    const exchangeTxRes = exchangeIx(
      exchangeValues.askPrice,
      exchangeValues.quantity,
      new PublicKey(exchangeValues.shopKeeperPublicKey),
      new PublicKey(exchangeValues.userPublicKey)
    );
    exchangeTX = exchangeTxRes;
    console.log(exchangeTxRes, "tx exchange");
    console.log(exchangeIx, "exchangeTx");
  };

  return (
    <div>
      <hr />
      <h1>Exchange Component</h1>
      <h3> NOTE: NEED TO HAVE SOL</h3>
      <h3>GET SHOPKEEPER PUBLIC KEY</h3>
      <TextField
        type="text"
        label="Shopkeeper Public key"
        onChange={(e) =>
          setExchangeValues({
            ...exchangeValues,
            shopKeeperPublicKey: e.target.value,
          })
        }
      />
      {/* <Button
        variant="contained"
        onClick={() => getSKAddress(skDetails.skName)}
      >
        Get SK Address
      </Button> */}
      <br />
      {/* create input boxes for ask and quantity, and send in args */}
      {/* Make a backend api call and get the shopkeepers address and put it in new PublicKey("PASTEHERE") */}
      <TextField
        label="User Address"
        onChange={(e) =>
          setExchangeValues({
            ...exchangeValues,
            userPublicKey: e.target.value,
          })
        }
      />
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
      <Button variant="contained" onClick={handleExchange}>
        Exchange token
      </Button>
      <Typography>{exchangeTX}</Typography>
      <hr />
    </div>
  );
};

export default Exchange;
