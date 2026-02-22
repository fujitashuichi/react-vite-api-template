import React from 'react'
import { useApiContext } from '../Provider/ApiContext'

export function ApiBoundary({ children }: { children: React.ReactNode }) {
    const data = useApiContext().data;

    if (data.status === "idle") {
        return (
            <h1>What would you like to fetch</h1>
        )
    }

    if (data.status === "loading") {
        return (
            <h1>Now loading...</h1>
        )
    }

    if (data.status === "error") {
        return (
            <div>
                <h1>Error</h1>
                <p>{data.error.message}</p>
            </div>
        )
    }

    if (data.status === "success") {
        return (
            <>{children}</>
        )
    }
}
