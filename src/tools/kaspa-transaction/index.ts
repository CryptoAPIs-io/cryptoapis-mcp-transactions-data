import type { CryptoApisHttpClient, McpLogger, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { KaspaTransactionToolSchema, type KaspaTransactionToolInput } from "./schema.js";
import { getTransactionDetails } from "../../api/kaspa-transaction/get-transaction-details/index.js";
import { credits as getDetailsCredits } from "./credits.js";

const DESCRIPTION = `Transactions Data Kaspa: get transaction details by transaction ID. Network: mainnet.`;

export const kaspaTransactionTool: McpToolDef<typeof KaspaTransactionToolSchema> = {
    name: "transactions_data_kaspa",
    description: DESCRIPTION,
    credits: getDetailsCredits,
    inputSchema: KaspaTransactionToolSchema,
    handler:
        (client: CryptoApisHttpClient, logger: McpLogger) =>
        async (input: KaspaTransactionToolInput) => {
            const result = await getTransactionDetails(client, {
                network: input.network,
                transactionId: input.transactionId,
                context: input.context,
            });

            logger.logInfo({
                tool: "transactions_data_kaspa",
                action: "get-transaction-details",
                blockchain: "kaspa",
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
