import { Rating } from "@/components"
import { ExtensionsResponseInFE, useVscodeExtension } from "@/lib"
import { CheckCircleIcon, DownloadIcon } from "@chakra-ui/icons"
import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  List,
  ListItem,
  SkeletonCircle,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react"

type ExtensionsProps = {
  extensions: ExtensionsResponseInFE
}

export function Extensions({ extensions }: ExtensionsProps) {
  return (
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

  const marketplaceUri = `https://marketplace.visualstudio.com/items?itemName=${extensionId}`

  return (
    <LinkBox>
      <HStack spacing={4} rounded="lg" borderWidth={1} px={4} py={2}>
        <Image
          {...(iconUri && { src: iconUri })}
          alt={extension?.extensionName}
          boxSize={24}
          fallback={<SkeletonCircle size="24" />}
          fit="contain"
        />
        <VStack spacing={1} align="stretch">
          <HStack spacing={1} align="center">
            <Heading size="lg" noOfLines={1}>
              <LinkOverlay href={marketplaceUri}>
                {extension?.displayName}
              </LinkOverlay>
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
          <Text noOfLines={2}>{extension?.shortDescription}</Text>
        </VStack>
      </HStack>
    </LinkBox>
  )
}
