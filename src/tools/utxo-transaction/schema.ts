import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";
import { UtxoTransactionAction, UtxoBlockchain, UtxoNetwork } from "./base-schema.js";

export const UtxoTransactionToolSchema = z
    .object({
        action: UtxoTransactionAction.describe("Action to perform"),
        blockchain: UtxoBlockchain.describe("Blockchain protocol"),
        network: UtxoNetwork.describe("Network name"),
        transactionHash: z.string().min(1).describe("Transaction hash"),
    })
    .merge(RequestMetadataSchema);

export type UtxoTransactionToolInput = z.infer<typeof UtxoTransactionToolSchema>;
