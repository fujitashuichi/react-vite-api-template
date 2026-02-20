import type { ApiDataType, ApiFetcherResponse, FetcherProps } from "./types.api"

// You should only change the Type: ApiDataType
type dataType = ApiDataType;

// Then rename the function to fetchUsers, fetchProducts, fetchStudents, etc.

export const fetcher = () => {
    const fetchApi = (props: FetcherProps<dataType>): Promise<ApiFetcherResponse> => {
        const fetchUrl = `https://domain/api/${props.query}`;

        const response = fetch(fetchUrl, {
            method: props.method,
            headers: {
                "Content-type": "application/json"
            },
            body: fetchOptionBody(props)
        });

        return shapedData(response);
    }


    return { fetchApi }
}


const shapedData = async (res: Promise<Response>): Promise<ApiFetcherResponse> => {
    const data = await res;
    if (!data.ok) {
        const errorText = data.statusText ?? data.text ?? "unknown Error: No errorTexts in response";
        return {
            ok: false,
            error: new Error(errorText)
        }
    }

    return {
        ok: true,
        value: await data.json()
    }
}

const fetchOptionBody = (props: FetcherProps<dataType>) => {
    switch (props.method) {
        case "GET":
            return undefined;
        case "POST":
            return JSON.stringify(props.data);
        case "PUT":
            return JSON.stringify(props.data);
        case "DELETE":
            return undefined;
    }
}
