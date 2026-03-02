import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type GetTransactionDetailsInput = {
    blockchain: string;
    network: string;
    transactionHash: string;
} & RequestMetadata;

export async function getTransactionDetails(client: CryptoApisHttpClient, input: GetTransactionDetailsInput) {
    const path = `/transactions/utxo/${input.blockchain}/${input.network}/${encodeURIComponent(input.transactionHash)}`;
    return client.request<unknown>("GET", path, { query: { context: input.context } });
}
