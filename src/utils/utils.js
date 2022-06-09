import * as BufferLayout from "buffer-layout";

/**
* Layout for a public key
*/
const publicKey = (property = "publicKey") => {
return BufferLayout.blob(32, property);
}
/**
* Layout for a 64bit unsigned value
*/
const uint64 = (property = "uint64") => {
return BufferLayout.blob(8, property);
};

export const ESCROW_ACCOUNT_DATA_LAYOUT = BufferLayout.struct([

BufferLayout.u8("isInitialized"),
publicKey("sellerPubkey"),
publicKey("tokenAccountPubkey"),
publicKey("mintKey"),
uint64("expectedAmount"),
]);

export const VALHALLA_ACCOUNT_DATA_LAYOUT = BufferLayout.struct([

BufferLayout.u8("isInitialized"),
publicKey("valhallaTreasury"),
publicKey("valhallaTeam"),
uint64("basePercentage"),
uint64("treasuryShare"),
uint64("teamShare"),
uint64("precision"),
]);

export const DECENSE_SHOPKEEPER_STATE = BufferLayout.struct([
    BufferLayout.u8("isInitialized"),
    publicKey("user"),
    uint64("market_valuation"),
    uint64("supply"),
    publicKey("user_token_mint"),
    publicKey("user_ata"),
    BufferLayout.u8("user_treasury_percentage"),
    BufferLayout.u8("liquidate_percentage"),
    publicKey("pda_ata"),
    uint64("cmp"),
    uint64("holders")
]);