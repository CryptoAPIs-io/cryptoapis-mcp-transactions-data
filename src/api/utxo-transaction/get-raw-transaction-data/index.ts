import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type GetRawTransactionDataInput = {
    blockchain: string;
    network: string;
    transactionHash: string;
} & RequestMetadata;

export async function getRawTransactionData(client: CryptoApisHttpClient, input: GetRawTransactionDataInput) {
    const path = `/transactions/utxo/${input.blockchain}/${input.network}/${encodeURIComponent(input.transactionHash)}/raw-data`;
    return client.request<unknown>("GET", path, { query: { context: input.context } });
}
