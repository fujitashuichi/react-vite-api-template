// Controller is intended to handle validation, business logic, and state interpretation.
//  You may continue using this as a class or refactor it into simple functions as needed.

import { ApiService } from "./ApiService";
import { ApiDataSchema, type ApiDataType, type ApiDataWithStatus } from "./internal";


export class ApiController {
    private readonly service = ApiService();

    getLoadableApiData = async (query: string): Promise<ApiDataWithStatus<ApiDataType>> => {
        const data = await this.service.fetchApi({ method: "GET", query: query });

        if (!data.ok) {
            return {
                status: "error",
                error: data.error
            }
        }

        if (!isValidApiData(data.value)) {
            return {
                status: "error",
                error: new Error("Invalid data type")
            }
        }

        return {
            status: "success",
            value: data.value
        }
    }
}

const isValidApiData = (value: unknown): value is ApiDataType => {
    return ApiDataSchema.safeParse(value).success;
}
