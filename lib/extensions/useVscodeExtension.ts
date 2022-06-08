import { useMemo } from "react"

import useSWRImmutable from "swr/immutable"
type AssetFile = {
  assetType: string
  source: string
}

type Statistic = {
  statisticName: string
  value: number
}

type Response = {
  results: [
    {
      extensions: [
        {
          publisher: {
            publisherId: string
            publisherName: string
            displayName: string
            flags: string
            domain: string
            isDomainVerified: boolean
          }
          extensionId: string
          extensionName: string
          displayName: string
          lastUpdated: string
          publishedDate: string
          releaseDate: string
          shortDescription: string
          versions: [
            {
              version: string
              lastUpdated: string
              files: AssetFile[]
              assetUri: string
              fallbackAssetUri: string
            }
          ]
          statistics: Statistic[]
        }
      ]
    }
  ]
}

export function useVscodeExtension(extensionId: string) {
  const init: RequestInit = useMemo(
    () => ({
      body: JSON.stringify({
        filters: [
          {
            criteria: [
              {
                filterType: 7,
                value: extensionId,
              },
            ],
            direction: 2,
            pageSize: 1,
            pageNumber: 1,
            sortBy: 0,
            sortOrder: 0,
            pagingToken: null,
          },
        ],
        flags: 870,
      }),
      method: "POST",
      headers: new Headers([
        [
          "Accept",
          "application/json;api-version=7.1-preview.1;excludeUrls=true",
        ],
        ["Content-Type", "application/json"],
      ]),
    }),
    [extensionId]
  )

  const { data, error } = useSWRImmutable<Response>([
    process.env.NEXT_PUBLIC_VSCODE_EXTENSION_API,
    init,
  ])

  const extension = data?.results[0].extensions[0]

  return {
    extension,
    isLoading: !error && !extension,
    isError: error,
  }
}
