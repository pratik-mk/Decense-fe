import { AccountLayout, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  //Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { connection } from './connection'
import { ESCROW_ACCOUNT_DATA_LAYOUT } from './utils'
import { sendTxUsingExternalSignature } from './externalwallet'

const BN = require("bn.js");

export const getTokenAccountFromMint = async (MintPubKey) => {
  const dataFromChain = await connection.getTokenLargestAccounts(
    new PublicKey(MintPubKey),
  );
  const tokenAccount = dataFromChain.value.filter((a) => a.amount === '1')[0]
    .address;
  return tokenAccount.toString();
};

export const user1 = async (user, nftmint, expLamports) => {

  console.log(user, "   lister publickey")
  console.log(nftmint, "*****mint")
  console.log(expLamports, "...........lamports");


  // get token Address for NFT
  const tokenAccount = await getTokenAccountFromMint(nftmint);
  const use1XAccountPub = tokenAccount;
  const systemProgramId = new PublicKey("11111111111111111111111111111111")
  const escrowProgramId = new PublicKey("7i45KBxfnHrTRUDs1uoFLHadk1y3HS2Y12H9pouLVEz8");

  const XMintPub = nftmint;
  const alicePub = user;
  const amount = expLamports;

  console.log('user! NFT associated account ::', use1XAccountPub)

  //create escrow account
  const newAcc = new Keypair();

  //init escrow account
  const initEscrowIx = new TransactionInstruction({
    programId: escrowProgramId,
    keys: [
      { pubkey: alicePub, isSigner: true, isWritable: false },
      {
        pubkey: use1XAccountPub,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: nftmint,
        isSigner: false,
        isWritable: false,
      },
      { pubkey: newAcc.publicKey, isSigner: true, isWritable: true },
      { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      { pubkey: systemProgramId, isSigner: false, isWritable: false },
    ],
    data: Buffer.from(
      Uint8Array.of(0, ...new BN(amount).toArray("le", 8)))
  });

  console.log([newAcc], "new acc keypir.........");

  await sendTxUsingExternalSignature(
    [
      // createEscrowAccountIx,
      initEscrowIx
    ],
    connection,
    null,
    [newAcc],
    new PublicKey(alicePub)
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log(newAcc.publicKey.toString(), "*******Escrow state account account ...");
  //console.log(tempXTokenAccountKeypair.publicKey.toString(), "*******temp account ...");
  console.log("****amount =", amount);

  console.log(
    `✨EscrowBuyNow successfully initialized. user1 is offering 1 NFT for ${amount} lamports✨\n`
  );

  console.log("");

};