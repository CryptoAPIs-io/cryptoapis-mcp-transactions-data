import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

export const KaspaNetwork = z.enum(["mainnet"]);

export const KaspaTransactionToolSchema = z
    .object({
        network: KaspaNetwork.describe("Network name"),
        transactionId: z.string().min(1).describe("Transaction ID"),
    })
    .merge(RequestMetadataSchema);

export type KaspaTransactionToolInput = z.infer<typeof KaspaTransactionToolSchema>;
