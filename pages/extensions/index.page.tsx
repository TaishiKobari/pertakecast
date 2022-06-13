import { Extensions, ImportForm, Layout, SwitchForm } from "@/components"
import { useExtensions } from "@/lib"
import { NextPageWithLayout } from "@/types"
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Container,
  Link,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { ReactElement, useCallback } from "react"

import { SAMPLE_FILE_PATH } from "@/constants"
import { saveAs } from "file-saver"

const ExtensionsPage: NextPageWithLayout = () => {
  const { extensions } = useExtensions()

  return (
    <VStack spacing={8} pt={[4, 8]}>
      <Container maxW="container.md">
        <VStack spacing={4}>
          <Explanation />
          <SimpleGrid columns={[1, 1, 2]}>
            <ImportForm />
            <Box pl={[0, 0, 8]} py={[8, 8, 0]}>
              <SwitchForm />
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
      <Extensions extensions={extensions ?? []} />
    </VStack>
  )
}

function Explanation() {
  const handleDownload = useCallback(async () => {
    try {
      const res = await (await fetch(SAMPLE_FILE_PATH)).blob()
      saveAs(res, "sample-extensions.json")
    } catch (e) {
      window.open(SAMPLE_FILE_PATH)
    }
  }, [])

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })

  return isVisible ? (
    <Alert status="info" position="relative">
      <AlertIcon />
      <Box>
        <AlertTitle>VS Code拡張をシェアしよう！</AlertTitle>
        <AlertDescription>
          <Text>
            1. VS CodeのSetting Syncなどからextensions.jsonを出力してください。
          </Text>
          <Link
            pl={2}
            color="blue.500"
            fontWeight="bold"
            onClick={handleDownload}
          >
            extensions.jsonのサンプルはこちらからダウンロード
          </Link>
          <Text>2. extensions.jsonをアップロードしてください。</Text>
          <Text>3. 完了したら公開リンクを発行して共有しよう！</Text>
        </AlertDescription>
      </Box>
      <CloseButton
        alignSelf="flex-start"
        position="absolute"
        right={1}
        top={1}
        onClick={onClose}
      />
    </Alert>
  ) : (
    <Button onClick={onOpen}>説明を表示</Button>
  )
}

ExtensionsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default ExtensionsPage
