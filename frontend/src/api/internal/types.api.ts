export type FetcherProps =
    | { method: "GET",    query: string }
    | { method: "POST",   query: string, data: ApiDataType }
    | { method: "PUT",    query: string, data: ApiDataType }
    | { method: "DELETE", query: string }

export type ApiDataType = {
    exampleId: number,
    exampleName: string,
    examplePrice: number
}

export type ApiFetcherResponse =
    | { ok: false, error: Error }
    | { ok: true, value: unknown }
