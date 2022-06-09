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


export const updateValAccounts = async (user) => {

  console.log(user, " lister publickey")


  const valUpdateAccountPubkey = new PublicKey("Ls3L2XgcAU1tF6yhAeMsfjami8qygtgp1yrzvVAAVBt");


  const valhalla_treasury = new PublicKey("Gc9SPfQUXsRjiHx3Fd7YQqNTcwivgwzxLi5Hb8JyPTdV")
  const valhalla_team = new PublicKey("2Hakiq5okm8Rb2V7u8xQ5YWep5tJiprFEze6jAWibNCk")

  const escrowProgramId = new PublicKey("AKbzzbRPUiug38RaPABunW7fxehEgkL3SZtdCGRELZXV");
  //const amount = 800100;

  // first 2 digit of 800250 is 80 is the treasury percentage
  // last 4 digit of 800250 is 0250 is the base percentage

  // if 80 is treasury % then team will be 20
  // and that calculation will be set on smart contract itself
  // the we can change 80 to any integer, like 5, 9, 10, 25, 70, 80, 100
  // and the team percentage will be calculated on contract itsel

  // if suppose overall base % is 2.5 then
  // we have to multiply it be 100 it will be 250
  // we have to pad this value with a leading 0 to make it 4 digit
  // so it will be 0250
  // more examples: for 10% it will be 10 * 100 - 1000, its already 4 digit
  // so no need to pad it with leading zeros
  // example: 5% it will be 5 * 100 so 500, hence it will be 0500
  // example 3.45% it will be 3.45 * 100 so 345, pad it with one 0 -> 0345
  // example 0.11% it will be 0.11 * 100 so 11, pad it with two leading 0 -> 0011
  // example 0.05% it will be 0.05 * 100 so 5, pad it with three leading zero -> 0005

  // constraints base percentage can not be lesser than 0.01%
  // constraints base percentage can not be greater than 99.99%
  // treasury percentage can not be in decimal only integer i.e: 5, 9, 10, 25, 70, 80, 100
  // treasury percentage cannot be a 0


  // 1

  // // if valUpdateaccpuntpubkey already exist
  // // this block

  //   {
  //     //init escrow account

  //     const updateAccountsIx = new TransactionInstruction({
  //       programId: escrowProgramId,
  //       keys: [
  //         { pubkey: user, isSigner: true, isWritable: false },
  //         {
  //           pubkey: valUpdateAccountPubkey,
  //           isSigner: false,
  //           isWritable: true,
  //         },
  //         { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
  //         { pubkey: valhalla_treasury, isSigner: false, isWritable: true },
  //         { pubkey: valhalla_team, isSigner: false, isWritable: true },

  //       ],
  //       data: Buffer.from(
  //         Uint8Array.of(3, ...new BN(100).toArray("le", 8), ...new BN(50).toArray("le", 8), ...new BN(50).toArray("le", 8)))
  //     });


  //     await sendTxUsingExternalSignature(
  //       [
  //         updateAccountsIx
  //       ],
  //       connection,
  //       null,
  //       [],
  //       new PublicKey(user)
  //     );

  //   }
  // }






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

  var base_percentage = 2.55555;
  var treasury_percentage = 80;
  var precision = 0;

  var base_per_with_pre = 0;
  var treasury_per_with_pre = 0;
  //init escrow account
  try {
    const len = base_percentage.toString().split(".")[1].length;
    precision = Math.pow(10, len);
    base_per_with_pre = base_percentage * precision;
  } catch (err) {
    console.log(err);
  }

  var base_percentage = new Float64Array(1);
  base_percentage[0] = 2.123456789;
  var treasury_percentage = new Float64Array(1);
  treasury_percentage[0] = 80.123456789;

  // var ba_b = new Uint8Array(base_percentage.buffer);
  // var ba_t = new Uint8Array(treasury_percentage.buffer);

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
      Uint8Array.of(
        3,
        ...new BN(base_per_with_pre).toArray("le", 8),
        ...new BN(treasury_per_with_pre).toArray("le", 8),
        ...new BN(precision).toArray("le", 8)))
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

}