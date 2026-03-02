import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type ListInternalTransactionsInput = {
    blockchain: string;
    network: string;
    transactionHash: string;
} & RequestMetadata;

export async function listInternalTransactions(client: CryptoApisHttpClient, input: ListInternalTransactionsInput) {
    const path = `/transactions/evm/${input.blockchain}/${input.network}/${encodeURIComponent(input.transactionHash)}/internal`;
    return client.request<unknown>("GET", path, { query: { context: input.context } });
}
