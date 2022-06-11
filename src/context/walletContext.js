import { createContext, useState, useContext } from "react";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [pubKey, setPubKey] = useState("");
  return (
    <WalletContext.Provider value={{ pubKey, setPubKey }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
