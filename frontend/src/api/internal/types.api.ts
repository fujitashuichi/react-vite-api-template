import z from "zod"

export const ApiDataSchema = z.object({
    id: z.number().int(),
    name: z.string().min(3).max(9)
});
export type ApiDataType = z.infer<typeof ApiDataSchema>;

export type FetcherProps =
    | { method: "GET",    query: string }
    | { method: "POST",   query: string, data: ApiDataType }
    | { method: "PUT",    query: string, data: ApiDataType }
    | { method: "DELETE", query: string }

export type ApiFetcherResponse =
    | { ok: false, error: Error }
    | { ok: true, value: unknown }


// T にはApiDataTypeなどを要します
export type LoadableApiData<T> =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "error", error: Error }
    | { status: "success", value: T }

export type ApiContextType<T> = {
    data: LoadableApiData<T>,
    apiHook: () => void;
}

export type ApiDataWithStatus<T> =
    | { status: "error", error: Error }
    | { status: "success", value: T }
