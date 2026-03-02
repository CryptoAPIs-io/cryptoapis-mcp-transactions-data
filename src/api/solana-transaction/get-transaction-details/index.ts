import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type GetTransactionDetailsInput = {
    network: string;
    transactionHash: string;
} & RequestMetadata;

export async function getTransactionDetails(client: CryptoApisHttpClient, input: GetTransactionDetailsInput) {
    const path = `/transactions/solana/${input.network}/${encodeURIComponent(input.transactionHash)}/details`;
    return client.request<unknown>("GET", path, { query: { context: input.context } });
}
