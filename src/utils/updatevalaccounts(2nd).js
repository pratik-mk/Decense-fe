import {
    Keypair,
    PublicKey,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    //Transaction,
    TransactionInstruction,
  } from "@solana/web3.js";
  import { connection } from './connection'
  import { VALHALLA_ACCOUNT_DATA_LAYOUT } from './utils'
  import { sendTxUsingExternalSignature } from './externalwallet'
  import { getOrCreateAssociatedAccount } from "./getOrCreateAssociatedAccount";
  
  const BN = require("bn.js");
  
  
  export const updateValAccounts = async(user) => {
  
    console.log(user , "   lister publickey")
  
  
    const valUpdateAccountPubkey = new PublicKey("1UnMvq2byjLeFtKb9vZ3ip1LfFXBd6Rvzv5kvh7ubWX");
   
  
    const valhalla_treasury = new PublicKey("Gc9SPfQUXsRjiHx3Fd7YQqNTcwivgwzxLi5Hb8JyPTdV")
    const valhalla_team = new PublicKey("2Hakiq5okm8Rb2V7u8xQ5YWep5tJiprFEze6jAWibNCk")
  
      const escrowProgramId = new PublicKey("6jergy9cCDj5rWgrphaxERUKLqMpXffrja6dyCSArcJE");
      const amount = 50200;

      

    const newAcc = new Keypair();

    const createUpdateAccountIx = SystemProgram.createAccount({
        programId: escrowProgramId,
        space: VALHALLA_ACCOUNT_DATA_LAYOUT.span,
        lamports: await connection.getMinimumBalanceForRentExemption(
          VALHALLA_ACCOUNT_DATA_LAYOUT.span
        ),
        fromPubkey: user,
        newAccountPubkey: newAcc.publicKey
      });

//init escrow account


const updateAccountsIx = new TransactionInstruction({
  programId: escrowProgramId,
  keys: [
    { pubkey: user, isSigner: true, isWritable: false },
    {
      pubkey: newAcc.publicKey,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
    { pubkey: valhalla_treasury, isSigner: false, isWritable: true },
    { pubkey: valhalla_team, isSigner: false, isWritable: true },

  ],
  data: Buffer.from(
    Uint8Array.of(3, ...new BN(amount).toArray("le", 8)))
});


      await sendTxUsingExternalSignature(
        [
          createUpdateAccountIx,
          updateAccountsIx
        ],
        connection,
        null,
        [newAcc],
        new PublicKey(user)
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));


     console.log(newAcc.publicKey.toString(), "*******update vallhala share account ...");
     //console.log(tempXTokenAccountKeypair.publicKey.toString(), "*******temp account ...");
     console.log("****amount =", amount);


}
