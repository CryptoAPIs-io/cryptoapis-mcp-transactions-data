import type { CryptoApisHttpClient, McpLogger, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { SolanaTransactionToolSchema, type SolanaTransactionToolInput } from "./schema.js";
import { getTransactionDetails } from "../../api/solana-transaction/get-transaction-details/index.js";
import { credits as getDetailsCredits } from "./credits.js";

const DESCRIPTION = `Transactions Data Solana: get transaction details by transaction hash (signature). Networks: mainnet, devnet.`;

export const solanaTransactionTool: McpToolDef<typeof SolanaTransactionToolSchema> = {
    name: "transactions_data_solana",
    description: DESCRIPTION,
    credits: getDetailsCredits,
    inputSchema: SolanaTransactionToolSchema,
    handler:
        (client: CryptoApisHttpClient, logger: McpLogger) =>
        async (input: SolanaTransactionToolInput) => {
            const result = await getTransactionDetails(client, {
                network: input.network,
                transactionHash: input.transactionHash,
                context: input.context,
            });

            logger.logInfo({
                tool: "transactions_data_solana",
                action: "get-transaction-details",
                blockchain: "solana",
                network: input.network,
                creditsConsumed: result.creditsConsumed,
                creditsAvailable: result.creditsAvailable,
                responseTime: result.responseTime,
                throughputUsage: result.throughputUsage,
            });

            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            ...(result.data as object),
                            creditsConsumed: result.creditsConsumed,
                            creditsAvailable: result.creditsAvailable,
                            responseTime: result.responseTime,
                            throughputUsage: result.throughputUsage,
                        }),
                    },
                ],
            };
        },
};
