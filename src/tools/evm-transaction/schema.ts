import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";
import { EvmTransactionAction, EvmBlockchain, EvmNetwork } from "./base-schema.js";

export const EvmTransactionToolSchema = z
    .object({
        action: EvmTransactionAction.describe("Action to perform"),
        blockchain: EvmBlockchain.describe("Blockchain protocol"),
        network: EvmNetwork.describe("Network name"),
        transactionHash: z.string().min(1).describe("Transaction hash"),
    })
    .merge(RequestMetadataSchema);

export type EvmTransactionToolInput = z.infer<typeof EvmTransactionToolSchema>;
