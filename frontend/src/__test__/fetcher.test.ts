// Input:
/* props: FetcherProps<dataType> =
    | { method: "GET",    query: string }
    | { method: "POST",   query: string, data: ApiDataType }
    | { method: "PUT",    query: string, data: ApiDataType }
    | { method: "DELETE", query: string }
*/

// Output:
/* Promise<FetchApiResponse> =
    | { ok: false, error: Error }
    | { ok: true, value: unknown }
*/

import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiService } from "../api";

const service = ApiService();

describe("fetcher", () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
        new Response(
            JSON.stringify({ name: "Taro" }),
            { status: 200 }
        )
    );

    it ("GET成功時 → ok: true", async () => {
        const result = await service.fetchApi({
            method: "GET",
            query: "/api/test"
        });

        expect(result.ok).toBe(true);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    })
});