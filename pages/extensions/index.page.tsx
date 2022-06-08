import { Layout } from "@/components"
import { EXTENSIONS_API, EXTENSIONS_IMPORT_API } from "@/constants"
import { useExtensions, useVscodeExtension } from "@/lib"
import { NextPageWithLayout } from "@/types"
import { CheckCircleIcon, DownloadIcon, StarIcon } from "@chakra-ui/icons"
import {
  Badge,
  Box,
  Button,
  chakra,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  List,
  ListItem,
  SimpleGrid,
  SkeletonCircle,
  StackDivider,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react"
import { FormEvent, Fragment, ReactElement, useCallback, useRef } from "react"
import { useSWRConfig } from "swr"

const Extensions: NextPageWithLayout = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { extensions } = useExtensions()

  const { mutate } = useSWRConfig()

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const file = inputRef.current?.files?.[0]

      if (!file) throw new Error("ファイルが選択されていません")
      const params = new FormData()
      params.append("jsonFile", file)

      await fetch(EXTENSIONS_IMPORT_API, { method: "POST", body: params })

      mutate(EXTENSIONS_API)
    },
    [mutate]
  )

  return (
    <VStack spacing={8}>
      <Container maxW="container.md">
        <SimpleGrid columns={2}>
          <chakra.form onSubmit={handleSubmit} pr={2}>
            <FormControl>
              <FormLabel htmlFor="file" fontWeight="bold" fontSize="2xl" pb={2}>
                extension.jsonをインポート
              </FormLabel>
              <Input id="file" type="file" accept=".json" ref={inputRef} />
            </FormControl>
            <Button my={4} type="submit" colorScheme="blue">
              インポート
            </Button>
          </chakra.form>

          <VStack spacing={0} align="stretch" pl={2}>
            <Switch size="lg" />
          </VStack>
        </SimpleGrid>
      </Container>
      <Container maxW="container.xl">
        <List spacing={4}>
          {extensions?.map(({ id, extensionId, userExtensions }, index) => (
            <ListItem key={id}>
              <Extension
                extensionId={extensionId}
                version={userExtensions[0]?.version ?? ""}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </VStack>
  )
}

type ExtensionProps = {
  extensionId: string
  version: string
}

function Extension({ extensionId, version }: ExtensionProps) {
  const { extension } = useVscodeExtension(extensionId)

  const assetUri = extension?.versions[0].assetUri

  const defaultIconUri =
    assetUri && `${assetUri}/Microsoft.VisualStudio.Services.Icons.Default`

  const smallIconUri =
    assetUri && `${assetUri}/Microsoft.VisualStudio.Services.Icons.Small`

  const iconUri = defaultIconUri || smallIconUri

  const installTimes = extension?.statistics.find(
    ({ statisticName }) => statisticName === "install"
  )?.value

  const rating = extension?.statistics.find(
    ({ statisticName }) => statisticName === "weightedRating"
  )?.value

  const ratingInt = rating && Math.round(rating)

  return (
    <HStack spacing={4} rounded="lg" borderWidth={1} px={4} py={2}>
      <Image
        {...(iconUri && { src: iconUri })}
        alt={extension?.extensionName}
        boxSize={24}
        fallback={<SkeletonCircle size="24" />}
        fit="contain"
      />
      <VStack spacing={1} align="stretch" overflow="hidden">
        <HStack spacing={1} align="center">
          <Heading
            size="lg"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {extension?.displayName}
          </Heading>
          <Badge>v{version}</Badge>
        </HStack>
        <HStack spacing={2} divider={<StackDivider />}>
          <HStack spacing={1}>
            {extension?.publisher.isDomainVerified && (
              <CheckCircleIcon color="blue.500" />
            )}
            <Text>{extension?.publisher.displayName}</Text>
          </HStack>
          <Box>
            <DownloadIcon />
            {installTimes?.toLocaleString()}
          </Box>
          <Rating rate={ratingInt} />
        </HStack>
        <Text maxH={12} overflow="hidden">
          {extension?.shortDescription}
        </Text>
      </VStack>
    </HStack>
  )
}

type RatingProps = {
  rate: number | undefined
}

function Rating({ rate }: RatingProps) {
  if (rate !== undefined && (rate < 0 || rate > 5)) return <></>
  return (
    <HStack spacing={0}>
      {[1, 2, 3, 4, 5].map((index) => (
        <Fragment key={index}>
          {rate === undefined ? (
            <SkeletonCircle size="4" />
          ) : index <= rate ? (
            <StarIcon color="orange.300" />
          ) : (
            <StarIcon color="gray.300" />
          )}
        </Fragment>
      ))}
    </HStack>
  )
}

Extensions.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Extensions
