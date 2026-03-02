import * as z from "zod";

export const UtxoTransactionAction = z.enum([
    "get-transaction-details",
    "get-raw-transaction-data",
]);

export const UtxoBlockchain = z.enum([
    "bitcoin",
    "bitcoin-cash",
    "litecoin",
    "dogecoin",
    "dash",
    "zcash",
]);

export const UtxoNetwork = z.enum(["mainnet", "testnet"]);
