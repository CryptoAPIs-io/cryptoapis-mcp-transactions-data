import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

export const SolanaNetwork = z.enum(["mainnet", "devnet"]);

export const SolanaTransactionToolSchema = z
    .object({
        network: SolanaNetwork.describe("Network name"),
        transactionHash: z.string().min(1).describe("Transaction hash (signature)"),
    })
    .merge(RequestMetadataSchema);

export type SolanaTransactionToolInput = z.infer<typeof SolanaTransactionToolSchema>;
