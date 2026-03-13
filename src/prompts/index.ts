import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GetPromptResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { formatSupportedChains } from "@cryptoapis-io/mcp-shared";
import { supportedChains } from "../resources/supported-chains.js";

export function registerPrompts(server: McpServer): void {
    server.registerPrompt(
        "lookup-transaction",
        {
            description: "Look up a transaction by hash and show its full details",
            argsSchema: {
                blockchain: z.string().describe("Blockchain to query (e.g. ethereum, bitcoin, solana, xrp, kaspa)"),
                network: z.string().describe("Network to query (e.g. mainnet, testnet, sepolia)"),
                transactionId: z.string().describe("Transaction hash or ID"),
            },
        },
        (args): GetPromptResult => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `Use the appropriate transaction data tool (transactions_data_evm, transactions_data_utxo, transactions_data_solana, transactions_data_xrp, or transactions_data_kaspa) with action 'get-transaction-details' to fetch transaction ${args.transactionId} on ${args.blockchain}/${args.network}. Present the full transaction details including: status, block confirmation, sender, recipient, amount, fees, and timestamp.\n\n${formatSupportedChains(supportedChains)}`,
                    },
                },
            ],
        }),
    );
}
