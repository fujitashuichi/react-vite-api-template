import { ApiService } from "../api";
import { apiDataMocks } from "../__mock__/apiData.mock";

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


const service = ApiService();

describe("fetcher", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it ("GET成功時は ok: true を返す", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue(apiDataMocks.successWithData());

        const result = await service.fetchApi({
            method: "GET",
            query: "/api/test"
        });
        expect(result.ok).toBe(true);
    });

    it ("GET失敗時は ok: false を返す", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue(apiDataMocks.error());

        const result = await service.fetchApi({
            method: "GET",
            query: "/api/test"
        });
        expect(result.ok).toBe(false);
    });

    it ("POST成功時は ok: true を返す", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue(apiDataMocks.successWithData());

        const result = await service.fetchApi({
            method: "POST",
            query: "/api/test/id",
            data: { id: 123, name: "Alex" }
        });
        expect(result.ok).toBe(true);
    });

    it ("POST失敗時は ok: false を返す", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue(apiDataMocks.error());

        const result = await service.fetchApi({
            method: "POST",
            query: "/api/test/id",
            data: { id: 987, name: "Eli" }
        });
        expect(result.ok).toBe(false);
    });

    it ("DELETE成功時は ok: true を返す", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue(apiDataMocks.successWithoutData());

        const result = await service.fetchApi({
            method: "DELETE",
            query: "/api/test/id"
        });
        expect(result.ok).toBe(true);
    });

    it ("DELETE失敗時は ok: false を返す", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue(apiDataMocks.error());

        const result = await service.fetchApi({
            method: "DELETE",
            query: "/api/test/id"
        });
        expect(result.ok).toBe(false);
    });
});