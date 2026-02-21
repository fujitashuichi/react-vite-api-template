import { ApiService } from "../ApiService"
import type { ApiContextType, ApiDataType, FetcherProps } from "./types.api"


// This func is used in ApiProvider
export const useFetchApi: ApiContextType<ApiDataType>["apiHook"] = () => {
    const service = ApiService();

    const fetch = (props: FetcherProps) => {
        const method = props.method;
        const query = props.query;

        if (method === "GET" || method === "DELETE") {
            return service.fetchApi({ method: method, query: query })
        }

        return service.fetchApi({ method: method, query: query, data: props.data });
    }

    return fetch;
}