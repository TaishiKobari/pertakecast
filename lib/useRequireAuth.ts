import { EXTENSIONS_PATH, LOGIN_PATH } from "@/constants"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

type UseRequireAuthProps = {
  allow: "authenticated" | "unauthenticated"
}

export function useRequireAuth(
  { allow }: UseRequireAuthProps = { allow: "authenticated" }
) {
  const { data: session, status } = useSession()

  const router = useRouter()

  useEffect(() => {
    switch (status) {
      case "loading":
        break
      case "unauthenticated":
        if (allow === "authenticated") router.push(LOGIN_PATH)
        break
      case "authenticated":
        if (allow === "unauthenticated") router.push(EXTENSIONS_PATH)
        break
    }
  }, [router, allow, status])

  return { session, isLoading: status === "loading" }
}
