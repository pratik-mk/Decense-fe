import React, { useState } from "react";
import { useWallet } from "../context/walletContext";
import { PublicKey } from "@solana/web3.js";
import { sendRecieveTokenIx } from "../utils/sendOrRecieveTokens";
import { TextField, Button, Typography } from "@mui/material";
import { getTokenByName } from "../services/api";

const Transfer = () => {
  const { pubKey } = useWallet();

  const [transferValues, setTransferValues] = useState({
    action: "",
    amount: "",
    skPublicKey: "",
    userPublicKey: "",
  });

  // const getSKAddress = async (skName) => {
  //   try {
  //     //make API call
  //     const res = await getTokenByName(skName);
  //     setSkDetails({ ...skDetails, skAddress: res.address });
  //   } catch (e) {
  //     console.log(e, "exchange componennt API error");
  //   }
  // };

  const handleTransfer = () => {
    const transferTxRes = sendRecieveTokenIx(
      transferValues.action,
      transferValues.amount,
      new PublicKey(transferValues.skPublicKey),
      new PublicKey(transferValues.userPublicKey)
    );
    console.log(transferTxRes, "transferTx");
  };
  console.log(pubKey, "pubkey context");
  return (
    <div>
      <hr />
      <h1>Transfer Component</h1>
      <h3>GET SHOPKEEPER PUBLIC KEY</h3>
      <TextField
        type="text"
        label="Shopkeeper Address"
        onChange={(e) =>
          setTransferValues({
            ...transferValues,
            skPublicKey: e.target.value,
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
      <Typography variant="h5">
        ACTION 0 = is for sending tokens to contrac, ACTION 1 = is for recieving
        tokens from contract
      </Typography>
      <TextField
        type="text"
        label="User Address"
        onChange={(e) =>
          setTransferValues({
            ...transferValues,
            userPublicKey: e.target.value,
          })
        }
      />
      <TextField
        type="number"
        label="Amount"
        onChange={(e) =>
          setTransferValues({
            ...transferValues,
            amount: parseInt(e.target.value),
          })
        }
      />
      <TextField
        type="number"
        label="Action"
        onChange={(e) =>
          setTransferValues({
            ...transferValues,
            action: parseInt(e.target.value),
          })
        }
      />
      <Button variant="contained" onClick={handleTransfer}>
        SEND OR RECEIVE TOKEN
      </Button>

      <br />
      <br />
      <hr />
    </div>
  );
};

export default Transfer;
