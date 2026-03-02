import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type ListTokenTransfersInput = {
    blockchain: string;
    network: string;
    transactionHash: string;
} & RequestMetadata;

export async function listTokenTransfers(client: CryptoApisHttpClient, input: ListTokenTransfersInput) {
    const path = `/transactions/evm/${input.blockchain}/${input.network}/${encodeURIComponent(input.transactionHash)}/tokens-transfers`;
    return client.request<unknown>("GET", path, { query: { context: input.context } });
}
