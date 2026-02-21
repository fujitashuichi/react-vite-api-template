import { useEffect, useState } from 'react'
import { ApiContext, useFetchApi, type ApiContextType, type ApiDataType } from './internal'
import { ApiController } from './ApiController';


// 1Providerあたり1つのクエリから取得することを想定しています

export const ApiProvider = () => {
    const [apiData, setApiData] = useState<ApiContextType<ApiDataType>["data"]>({ status: "idle" });
    const controller = new ApiController();
    const apiHook: ApiContextType<ApiDataType>["apiHook"] = () => useFetchApi();


    useEffect(() => {
        setApiData({ status: "loading" });

        const fetch = async () => {
            const data = await controller.getLoadableApiData("/api/example");
            setApiData(data);
        }
        fetch();
    }, []);


    return (
        <ApiContext.Provider value={{ data: apiData, apiHook: apiHook }}></ApiContext.Provider>
    )
}
