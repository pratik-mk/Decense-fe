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

export const initializeSK = async (skeeper) => {

  // get this in arg
  const market_valuation = 10000;
  const supply = 10000;

  const platform_state_account = await PublicKey.createWithSeed(
    adminId,
    "DECENSE PLATFORM",
    programId
  );

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

  console.log("Skeeper", skeeper_state.toString());

  const [pda] = await PublicKey.findProgramAddress(
    [new PublicKey(skeeper).toBuffer()],
    programId
  );

  const user_ata = await getOrCreateAssociatedAccount(skeeper, mintId, skeeper);

  const pda_ata = await getOrCreateAssociatedAccount(pda, mintId, skeeper);

  const initSKIx = new TransactionInstruction({
    programId: programId,
    keys: [
      { pubkey: skeeper, isSigner: true, isWritable: false },
      { pubkey: mintId, isSigner: false, isWritable: true },
      { pubkey: skeeper_state, isSigner: false, isWritable: true },
      {
        pubkey: platform_state_account,
        isSigner: false,
        isWritable: true,
      },
      { pubkey: adminId, isSigner: false, isWritable: true },
      { pubkey: pda, isSigner: false, isWritable: false },
      { pubkey: user_ata, isSigner: false, isWritable: true },
      { pubkey: pda_ata, isSigner: false, isWritable: true },
      {
        pubkey: TOKEN_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
      { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
      {
        pubkey: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data: Buffer.from(
      Uint8Array.of(
        1,
        ...new BN(market_valuation).toArray("le", 8),
        ...new BN(supply).toArray("le", 8)
      )
    ),
  });

  const tx = await sendTxUsingExternalSignature(
    [initSKIx],
    connection,
    null,
    [],
    new PublicKey(skeeper)
  );

  console.log("tx:", tx);



  ///////////////////////////////////////////////////////////////////////////////////////////////
  ////// get shopkeepers data

  const sk_state = await connection.getAccountInfo(skeeper_state);

  console.log(sk_state)

  const decoded = DECENSE_SHOPKEEPER_STATE.decode(sk_state.data);

  console.log(decoded);

  ////// to convert byte array pubkey to string => .toString()
  ///////////////////////////////////////////////////////////////////////////////////////////////

  await new Promise((resolve) => setTimeout(resolve, 2000));
};
