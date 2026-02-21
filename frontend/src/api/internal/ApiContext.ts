import { createContext, useContext } from "react";
import type { ApiContextType, ApiDataType } from "./";

export const ApiContext = createContext<ApiContextType<ApiDataType> | null>(null);

export const useApiContext = () => {
    const ctx = useContext(ApiContext);
    if (ctx === null) throw new Error("ApiContext must be used within ApiProvider");
    return ctx;
}
