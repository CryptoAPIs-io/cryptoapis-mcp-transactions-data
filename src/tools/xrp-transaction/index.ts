import type { CryptoApisHttpClient, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { XrpTransactionToolSchema, type XrpTransactionToolInput } from "./schema.js";
import { getTransactionDetails } from "../../api/xrp-transaction/get-transaction-details/index.js";
import { credits as getDetailsCredits } from "./credits.js";

const DESCRIPTION = `Transactions Data XRP: get transaction details by transaction hash. Networks: mainnet, testnet.`;

export const xrpTransactionTool: McpToolDef<typeof XrpTransactionToolSchema> = {
    name: "transactions_data_xrp",
    description: DESCRIPTION,
    credits: getDetailsCredits,
    inputSchema: XrpTransactionToolSchema,
    handler:
        (client: CryptoApisHttpClient) =>
        async (input: XrpTransactionToolInput) => {
            const result = await getTransactionDetails(client, {
                network: input.network,
                transactionHash: input.transactionHash,
                context: input.context,
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
