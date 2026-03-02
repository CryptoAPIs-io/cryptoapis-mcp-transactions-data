import { systemInfoTool } from "@cryptoapis-io/mcp-shared";
import { utxoTransactionTool } from "./utxo-transaction/index.js";
import { evmTransactionTool } from "./evm-transaction/index.js";
import { solanaTransactionTool } from "./solana-transaction/index.js";
import { xrpTransactionTool } from "./xrp-transaction/index.js";
import { kaspaTransactionTool } from "./kaspa-transaction/index.js";

export const tools = [
    utxoTransactionTool,
    evmTransactionTool,
    solanaTransactionTool,
    xrpTransactionTool,
    kaspaTransactionTool,
    systemInfoTool,
] as const;
