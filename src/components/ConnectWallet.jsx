import { Button } from "@mui/material";
import React from "react";
import { useWallet } from "../context/walletContext";

const ConnectWallet = () => {
  const { pubKey, setPubKey } = useWallet();

  const getConnectedWallet = async () => {
    const provider = await window.solana;
    if (provider) {
      setPubKey(provider.publicKey);
      localStorage.setItem("pubKey", provider.pubKey);
    } else console.log("Try to connect again");
  };

  const connectWallet = async () => {
    const provider = window.solana;
    console.log(provider);
    if (provider) {
      await window.solana.connect();
      window.solana.on("connect", () => console.log("connect"));
      getConnectedWallet();
    } else window.open("https://phantom.app/", "_blank");
  };

  const disconnectWallet = () => {
    window.solana.disconnect();
    localStorage.removeItem("pubKey");
    setPubKey();
  };

  return (
    <div>
      <hr />
      <h1>Connect Wallet Component</h1>
      <h2>Hey: {pubKey ? pubKey.toString() : ""}</h2>
      <Button variant="contained" onClick={connectWallet}>
        Connect Here!
      </Button>
      <br />
      <br />
      <Button variant="contained" onClick={disconnectWallet}>
        Disconnect Here!
      </Button>
      <hr />
    </div>
  );
};

export default ConnectWallet;
