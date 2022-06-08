import { EXTENSIONS_PATH, LOGIN_PATH } from "@/constants"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

type UseRequireAuthProps = {
  allow: "authenticated" | "stranger"
}

export function useRequireAuth(
  { allow }: UseRequireAuthProps = { allow: "authenticated" }
) {
  const { data: session } = useSession()

  const router = useRouter()

  // If auth.user is false that means we're not
  // logged in and should redirect.
  useEffect(() => {
    if (!session && typeof session != "undefined") {
      if (allow === "authenticated") router.push(LOGIN_PATH)
    } else {
      if (allow === "stranger") router.push(EXTENSIONS_PATH)
    }
  }, [session, router, allow])

  return session
}
