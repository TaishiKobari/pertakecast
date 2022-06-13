import { USER_API } from "@/constants"
import { User } from "@prisma/client"
import useSWR from "swr"

export function useUser() {
  const { data, error } = useSWR<User>(USER_API)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}
