import type { CryptoApisHttpClient, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { UtxoTransactionToolSchema, type UtxoTransactionToolInput } from "./schema.js";
import { getTransactionDetails } from "../../api/utxo-transaction/get-transaction-details/index.js";
import { getRawTransactionData } from "../../api/utxo-transaction/get-raw-transaction-data/index.js";
import { credits as getDetailsCredits } from "./get-transaction-details/credits.js";
import { credits as getRawCredits } from "./get-raw-transaction-data/credits.js";

const DESCRIPTION = `Transactions Data UTXO: get transaction details or raw transaction data by hash.

Actions: get-transaction-details, get-raw-transaction-data. Blockchains: bitcoin, bitcoin-cash, litecoin, dogecoin, dash, zcash. Networks: mainnet, testnet.`;

export const utxoTransactionTool: McpToolDef<typeof UtxoTransactionToolSchema> = {
    name: "transactions_data_utxo",
    description: DESCRIPTION,
    credits: { "get-transaction-details": getDetailsCredits, "get-raw-transaction-data": getRawCredits },
    inputSchema: UtxoTransactionToolSchema,
    handler:
        (client: CryptoApisHttpClient) =>
        async (input: UtxoTransactionToolInput) => {
            let result: RequestResult<unknown>;
            const base = { blockchain: input.blockchain, network: input.network, transactionHash: input.transactionHash, context: input.context };
            if (input.action === "get-transaction-details") {
                result = await getTransactionDetails(client, base);
            } else {
                result = await getRawTransactionData(client, base);
            }
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
