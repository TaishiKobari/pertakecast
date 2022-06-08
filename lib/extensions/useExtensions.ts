import { EXTENSIONS_API } from "@/constants"
import { ExtensionsResponseInFE } from "@/lib/extensions/extensionsResponse"
import useSWR from "swr"

export function useExtensions() {
  const { data, error } = useSWR<ExtensionsResponseInFE>(EXTENSIONS_API)

  return {
    extensions: data,
    isLoading: !error && !data,
    isError: error,
  }
}
