import { createContext, useContext } from "react";
import type { ApiContextType, ApiDataType } from "../internal";


export const ApiContext = createContext<ApiContextType<ApiDataType> | null>(null);

export const useApiContext = () => {
    const ctx = useContext(ApiContext);
    if (ctx === null) throw new Error("ApiContext must be used within ApiProvider");
    return ctx;
}

export const useApiData = () => {
    const data = useApiContext().data;
    if (data.status !== "success") {
        throw new Error("useApiData can only be used when status is 'success'");
    }
    return data.value;
}

export const useFetchApi = () => {
    const hook = useApiContext().apiHook;
    if (!hook) {
        throw new Error("apiHook must be provided by ApiProvider");
    }
    return hook;
}
