import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
} from "@solana/web3.js";
import { SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID } from "./associatedAccounts";
import { connection } from "./connection";
import { sendTxUsingExternalSignature } from "./externalwallet";
import { getOrCreateAssociatedAccount } from "./getOrCreateAssociatedAccount";
import { programId, adminId } from "./ids";
import { DECENSE_SHOPKEEPER_STATE } from "./utils";

const BN = require("bn.js");

export const sendRecieveTokenIx = async (
  actionARGS,
  amountARGS,
  skeeper,
  user
) => {
  // get this in arg

  // action = 0 is for sending tokens to contract; action = 1 is for recieving tokens from contract
  const action = actionARGS;
  const amount = amountARGS * 10000;

  const mintId = await PublicKey.createWithSeed(
    skeeper,
    "SHOPKEEPER MINT",
    TOKEN_PROGRAM_ID
  );

  const skeeper_state = await PublicKey.createWithSeed(
    skeeper,
    "DECENSE USER",
    programId
  );

  const user_state = await PublicKey.createWithSeed(
    user,
    "DECENSE BUYER",
    programId
  );

  const [pda] = await PublicKey.findProgramAddress(
    [new PublicKey(skeeper).toBuffer()],
    programId
  );

  const user_ata = await getOrCreateAssociatedAccount(user, mintId, user);

  const pda_ata = await getOrCreateAssociatedAccount(pda, mintId, skeeper);

  const sendRecieveTokenIx = new TransactionInstruction({
    programId: programId,
    keys: [
      { pubkey: skeeper, isSigner: false, isWritable: true },
      { pubkey: skeeper_state, isSigner: false, isWritable: true },
      { pubkey: mintId, isSigner: false, isWritable: true },

      { pubkey: user, isSigner: true, isWritable: false },
      { pubkey: user_state, isSigner: false, isWritable: true },
      { pubkey: user_ata, isSigner: false, isWritable: true },
      { pubkey: pda, isSigner: false, isWritable: false },
      { pubkey: pda_ata, isSigner: false, isWritable: true },
      {
        pubkey: TOKEN_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data: Buffer.from(
      Uint8Array.of(
        3,
        ...new BN(action).toArray("le", 8),
        ...new BN(amount).toArray("le", 8)
      )
    ),
  });

  const tx = await sendTxUsingExternalSignature(
    [sendRecieveTokenIx],
    connection,
    null,
    [],
    new PublicKey(user)
  );

  console.log("tx:", tx);

  ///////////////////////////////////////////////////////////////////////////////////////////////
  ////// get shopkeepers data

  //   const sk_state = await connection.getAccountInfo(skeeper_state);

  //   console.log(sk_state);

  //   const decoded = DECENSE_SHOPKEEPER_STATE.decode(sk_state.data);

  //   console.log(decoded);

  ////// to convert byte array pubkey to string => .toString()
  ///////////////////////////////////////////////////////////////////////////////////////////////

  await new Promise((resolve) => setTimeout(resolve, 2000));
};
