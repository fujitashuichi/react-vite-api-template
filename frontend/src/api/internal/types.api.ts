export type FetcherProps =
    | { method: "GET",    query: string }
    | { method: "POST",   query: string, data: ApiDataType }
    | { method: "PUT",    query: string, data: ApiDataType }
    | { method: "DELETE", query: string }

export type ApiDataType = {
    id: number,
    name: string
}

export type ApiFetcherResponse =
    | { ok: false, error: Error }
    | { ok: true, value: unknown }


// T にはApiDataTypeなどを要します
export type LoadableApiData<T> =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "error", error: Error }
    | { status: "success", data: T }

export type ApiContextType<T> = {
    loadableData: T,
    apiHook: () => void;
}
