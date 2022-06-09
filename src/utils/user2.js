//user 2 --> NFT owner
import { AccountLayout, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { connection } from "./connection";
import {
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  Keypair
} from "@solana/web3.js";

import {
  ESCROW_ACCOUNT_DATA_LAYOUT,
  VALHALLA_ACCOUNT_DATA_LAYOUT
} from "./utils";
import { getOrCreateAssociatedAccount } from './getOrCreateAssociatedAccount';
import { sendTxUsingExternalSignature } from './externalwallet';
import { fetchMetadata } from "./fetchmetdatafrommint";
import { decodeMetadata, getMetadataAccount } from "./helper";
const BN = require("bn.js");

const getStates = async (programId) => {
  const accounts = await connection.getProgramAccounts(programId);
  return accounts[Math.floor(Math.random() * accounts.length)]
}

export const user2 = async (user) => {
  console.log(user, "chceck user");

  const systemProgramId = new PublicKey("11111111111111111111111111111111")
  const buyer = new PublicKey(user);

  const escrowStateAccountPubkey = new PublicKey("Ftbp3epqkBnnV1LAnrDgvhLKQHaFMSVEVZ546JrdQrDB");
  const escrowProgramId = new PublicKey("7i45KBxfnHrTRUDs1uoFLHadk1y3HS2Y12H9pouLVEz8")
  //const amount = 1;

  let escrowState;
  let escrowAccount;

  while (true) {
    //fetch data
    escrowAccount = await connection.getAccountInfo(
      (await getStates(escrowProgramId)).pubkey
    );

    if (escrowAccount === null) {
      console.log("Could not find escrow at given address!");
      //process.exit(1);
    }
    console.log(escrowAccount, "*****escrow Account ..");
    //console.log(escrowAccount.publicKey.toString(),".....****Escrow Account key ....")

    const encodedEscrowState = escrowAccount && escrowAccount.data;
    const decodedEscrowLayout = ESCROW_ACCOUNT_DATA_LAYOUT.decode(
      encodedEscrowState
    );
    const mint = new PublicKey(decodedEscrowLayout.mintKey);
    console.log(mint.toBase58(), "****Mint key****")

    escrowState = {
      escrowAccountPubkey: escrowStateAccountPubkey,
      isInitialized: !!decodedEscrowLayout.isInitialized,
      initializerAccountPubkey: new PublicKey(
        decodedEscrowLayout.sellerPubkey
      ),
      XTokenTempAccountPubkey: new PublicKey(
        decodedEscrowLayout.tokenAccountPubkey
      ),
      TokenMintKey: new PublicKey(
        decodedEscrowLayout.mintKey
      ),
      expectedAmount: new BN(decodedEscrowLayout.expectedAmount, 10, "le"),
    };

    if (escrowState.isInitialized == true) {
      break;
    }

  }


  const PDA = await PublicKey.findProgramAddress(
    [
      Buffer.from("valhalla"),
      escrowStateAccountPubkey.toBuffer()
    ],
    escrowProgramId
  );


  const keystest = [
    { pubkey: buyer, isSigner: true, isWritable: false },
    //{ pubkey: bobXAccountPub, isSigner: false, isWritable: true },
    {
      pubkey: escrowState.XTokenTempAccountPubkey,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: escrowState.initializerAccountPubkey,
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: escrowState.TokenMintKey,
      isSigner: false,
      isWritable: true,
    },
    { pubkey: escrowStateAccountPubkey, isSigner: false, isWritable: true },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: systemProgramId, isSigner: false, isWritable: false },
    { pubkey: PDA[0], isSigner: false, isWritable: false }
  ]


  // sending transaction

  const exchangeInstruction = new TransactionInstruction({
    programId: escrowProgramId,
    data: Buffer.from(
      Uint8Array.of(1, ...new BN(1).toArray("le", 8))
    ),
    keys: keystest,
  });


  console.log("Sending Bob's transaction...");
  await sendTxUsingExternalSignature(
    [exchangeInstruction],
    connection,
    null,
    [],
    buyer,
  );

  // sleep to allow time to update
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log(
    "✨Trade successfully executed. All temporary accounts closed✨\n"
  );
}