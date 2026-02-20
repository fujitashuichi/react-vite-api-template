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
