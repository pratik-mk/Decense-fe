import React from "react";
import { useWallet } from "../context/walletContext";

const ConnectWallet = () => {
  const { pubKey, setPubKey } = useWallet();

  const getConnectedWallet = async () => {
    const provider = await window.solana;
    if (provider) {
      setPubKey(provider.publicKey.toString());
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
      <button onClick={connectWallet}>Connect Here!</button>
      <button onClick={disconnectWallet}>Disconnect Here!</button>
      <hr />
    </div>
  );
};

export default ConnectWallet;
