import { PublicKey } from "@solana/web3.js";
import { findAssociatedTokenAccountPublicKey } from "../utils/associatedAccounts";
import { getAccountInfo } from "./getAccountInfo";
import { createAssociatedTokenAccount } from "./AssAccounts";
import { connection } from "./connection";

export const getOrCreateAssociatedAccount = async (owner, mint, payer) => {
  let pubOwner = new PublicKey(owner);
  let pubMint = new PublicKey(mint);
  let payerPub = new PublicKey(payer);

  let associatedAddress = await findAssociatedTokenAccountPublicKey(
    pubOwner,
    pubMint
  );
  console.log(associatedAddress.toBase58(), " ****** Associated account");
  const assAcc = new PublicKey(associatedAddress);
  return assAcc;

  try {
    let some = await getAccountInfo(associatedAddress);
    console.log(some, "some");
  } catch (err) {
    if (err) {
      try {
        await createAssociatedTokenAccount(
          null,
          true,
          pubMint,
          pubOwner,
          payerPub
        );
      } catch (err) {
        console.log(err);
      }
    }
  }
  return associatedAddress;
};
