'use client'
import { ReactElement } from "react"
import { SessionProvider } from "next-auth/react"

const Provider: React.FC<any> = ({ children }: { children: React.ReactNode }): ReactElement => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default Provider;