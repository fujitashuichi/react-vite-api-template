
export const apiDataMocks = {
    successWithData: () => new Response(
        JSON.stringify({ name: "Taro" }),
        { status: 200 }
    ),

    successWithoutData: () => new Response(
        null,
        { status: 200 }
    ),

    error: () => new Response(
        JSON.stringify({ message: "error" }),
        { status: 500 }
    )
}
