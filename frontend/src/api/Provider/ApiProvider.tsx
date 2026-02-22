import React, { useEffect, useState } from 'react'
import { useFetchApi, type ApiContextType, type ApiDataType } from '../internal'
import { ApiController } from '../Controller';
import { ApiContext } from './ApiContext';


// 1Providerあたり1つのクエリから取得することを想定しています

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
    const [apiData, setApiData] = useState<ApiContextType<ApiDataType>["data"]>({ status: "idle" });
    const controller = new ApiController();


    useEffect(() => {
        setApiData({ status: "loading" });

        const fetch = async () => {
            const data = await controller.getLoadableApiData("/api/example");
            setApiData(data);
        }
        fetch();
    }, []);

    return (
        <ApiContext.Provider value={{ data: apiData, apiHook: useFetchApi }}>{children}</ApiContext.Provider>
    )
}
