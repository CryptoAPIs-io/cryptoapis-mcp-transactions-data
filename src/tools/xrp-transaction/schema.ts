import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

export const XrpNetwork = z.enum(["mainnet", "testnet"]);

export const XrpTransactionToolSchema = z
    .object({
        network: XrpNetwork.describe("Network name"),
        transactionHash: z.string().min(1).describe("Transaction hash"),
    })
    .merge(RequestMetadataSchema);

export type XrpTransactionToolInput = z.infer<typeof XrpTransactionToolSchema>;
