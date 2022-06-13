import { Header } from "@/components"
import { useRequireAuth } from "@/lib"
import { Spinner } from "@chakra-ui/react"
import { ReactNode } from "react"

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { session, isLoading } = useRequireAuth()

  if (isLoading) return <Spinner />

  return (
    <>
      <Header isLoggedIn={!!session} />
      {children}
    </>
  )
}
