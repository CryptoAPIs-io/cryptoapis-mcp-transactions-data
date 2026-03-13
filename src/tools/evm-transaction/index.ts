import type { CryptoApisHttpClient, McpLogger, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { EvmTransactionToolSchema, type EvmTransactionToolInput } from "./schema.js";
import * as evmApi from "../../api/evm-transaction/index.js";
import { credits as getDetailsCredits } from "./get-transaction-details/credits.js";
import { credits as listInternalCredits } from "./list-internal-transactions/credits.js";
import { credits as listTokenTransfersCredits } from "./list-token-transfers/credits.js";
import { credits as listLogsCredits } from "./list-logs/credits.js";

const DESCRIPTION = `Transactions Data EVM: get transaction details, internal transactions, token transfers, or logs by transaction hash.

Actions: get-transaction-details, list-internal-transactions, list-token-transfers, list-logs.`;

export const evmTransactionTool: McpToolDef<typeof EvmTransactionToolSchema> = {
    name: "transactions_data_evm",
    description: DESCRIPTION,
    credits: {
        "get-transaction-details": getDetailsCredits,
        "list-internal-transactions": listInternalCredits,
        "list-token-transfers": listTokenTransfersCredits,
        "list-logs": listLogsCredits,
    },
    inputSchema: EvmTransactionToolSchema,
    handler:
        (client: CryptoApisHttpClient, logger: McpLogger) =>
        async (input: EvmTransactionToolInput) => {
            const base = { blockchain: input.blockchain, network: input.network, transactionHash: input.transactionHash, context: input.context };
            let result: RequestResult<unknown>;
            switch (input.action) {
                case "get-transaction-details":
                    result = await evmApi.getTransactionDetails(client, base);
                    break;
                case "list-internal-transactions":
                    result = await evmApi.listInternalTransactions(client, base);
                    break;
                case "list-token-transfers":
                    result = await evmApi.listTokenTransfers(client, base);
                    break;
                case "list-logs":
                    result = await evmApi.listLogs(client, base);
                    break;
                default:
                    throw new Error(`Unknown action: ${(input as any).action}`);
            }

            logger.logInfo({
                tool: "transactions_data_evm",
                action: input.action,
                blockchain: input.blockchain,
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
