import { HOME_PATH } from "@/constants"
import { useRequireAuth } from "@/lib"
import { Button, Spinner } from "@chakra-ui/react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { ReactNode, useCallback } from "react"

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const session = useRequireAuth()

  const router = useRouter()

  const handleClick = useCallback(async () => {
    await signOut()
    router.push(HOME_PATH)
  }, [router])

  if (!session) return <Spinner />

  return (
    <>
      <Button onClick={handleClick}>signOut</Button>
      {children}
    </>
  )
}
