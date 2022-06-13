import { Error } from "@/lib/api/error"

export type ServiceResponse<T> = {
  data?: T
  error?: Error
}
