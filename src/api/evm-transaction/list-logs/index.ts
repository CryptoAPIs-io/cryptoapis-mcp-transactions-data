import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type ListLogsInput = {
    blockchain: string;
    network: string;
    transactionHash: string;
} & RequestMetadata;

export async function listLogs(client: CryptoApisHttpClient, input: ListLogsInput) {
    const path = `/transactions/evm/${input.blockchain}/${input.network}/${encodeURIComponent(input.transactionHash)}/logs`;
    return client.request<unknown>("GET", path, { query: { context: input.context } });
}
