import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import { connection } from "./connection";
import { sendTxUsingExternalSignature } from "./externalwallet";
import { programId } from "./ids";

export const initializePlatform = async (user) => {
  const platform_state_account = await PublicKey.createWithSeed(
    user,
    "DECENSE PLATFORM",
    programId
  );

  const initPlatformIx = new TransactionInstruction({
    programId: programId,
    keys: [
      { pubkey: user, isSigner: true, isWritable: false },
      {
        pubkey: platform_state_account,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: user,
        isSigner: false,
        isWritable: false,
      },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data: Buffer.from(Uint8Array.of(0)),
  });

  const tx = await sendTxUsingExternalSignature(
    [initPlatformIx],
    connection,
    null,
    [],
    new PublicKey(user)
  );

  console.log("tx:", tx);

  await new Promise((resolve) => setTimeout(resolve, 2000));
};
