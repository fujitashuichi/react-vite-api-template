import type { ApiFetcherResponse, FetcherProps } from "./internal";

export const ApiService = () => {
    // Rename the function to fetchUsers, fetchProducts, fetchStudents, etc.

    const fetchApi = (props: FetcherProps): Promise<ApiFetcherResponse> => {
        const fetchUrl = `https://domain/api/${props.query}`;

        const response = fetch(fetchUrl, {
            method: props.method,
            headers: {
                "Content-type": "application/json"
            },
            body: fetchOptionBody(props)
        });

        return shapedData(props.method, response);
    }


    return { fetchApi }
}


const shapedData = async (method: "GET" | "POST" | "PUT" | "DELETE" ,res: Promise<Response>): Promise<ApiFetcherResponse> => {
    const data = await res;
    if (!data.ok) {
        const errorText = data.statusText ?? data.text ?? "unknown Error: No errorTexts in response";
        return {
            ok: false,
            error: new Error(errorText)
        }
    }

    if (method === "DELETE") {
        return {
            ok: true,
            value: undefined
        }
    }

    return {
        ok: true,
        value: await data.json()
    }
}

const fetchOptionBody = (props: FetcherProps) => {
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
