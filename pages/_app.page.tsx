import { fetcher } from "@/lib"
import { NextPageWithLayout } from "@/types"
import { ChakraProvider } from "@chakra-ui/react"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { SWRConfig } from "swr"

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher,
          shouldRetryOnError: false,
        }}
      >
        <ChakraProvider>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp
