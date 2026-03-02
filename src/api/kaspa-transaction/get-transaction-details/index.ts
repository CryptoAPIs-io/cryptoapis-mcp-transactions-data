import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type GetTransactionDetailsInput = {
    network: string;
    transactionId: string;
} & RequestMetadata;

export async function getTransactionDetails(client: CryptoApisHttpClient, input: GetTransactionDetailsInput) {
    const path = `/transactions/kaspa/${input.network}/${encodeURIComponent(input.transactionId)}`;
    return client.request<unknown>("GET", path, { query: { context: input.context } });
}
