import { FieldWrapper } from "@/components"
import { USER_API } from "@/constants"
import { UserPatchRequestBody, useUser } from "@/lib"
import {
  Box,
  Button,
  HStack,
  Link,
  Switch,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { useCallback, useEffect, useId, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { useSWRConfig } from "swr"

export function SwitchForm() {
  const { user } = useUser()

  const { mutate } = useSWRConfig()

  const defaultValue = user?.isPublic ?? false

  const [isPublic, setIsPublic] = useState(defaultValue)

  useEffect(() => {
    setIsPublic(defaultValue)
  }, [defaultValue])

  const id = useId()

  const handleChange = useCallback(async () => {
    try {
      const body: UserPatchRequestBody = {
        isPublic: !isPublic,
      }
      await fetch(USER_API, {
        method: "PATCH",
        body: JSON.stringify(body),
      })

      mutate(USER_API)
    } catch (error) {
      console.warn(error)
    }
  }, [isPublic, mutate])

  return (
    <VStack spacing={4} align="stretch">
      <FieldWrapper
        htmlFor={id}
        label="拡張機能一覧を公開する"
        error={undefined}
      >
        <Switch
          id={id}
          size="lg"
          isChecked={isPublic}
          onChange={handleChange}
        />
      </FieldWrapper>
      {isPublic && <SharedUrl sharedId={user?.sharedId ?? ""} />}
    </VStack>
  )
}

type SharedUrlProps = {
  sharedId: string
}

function SharedUrl({ sharedId }: SharedUrlProps) {
  const toast = useToast()

  const handleCopy = useCallback(() => {
    toast({
      title: "コピーしました",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }, [toast])

  const sharedUrl = `https://pertakecast.vercel.app/extensions/shared/${sharedId}`

  return (
    <HStack spacing={2}>
      <Box overflowX="scroll" whiteSpace="nowrap" py={2} flex={1}>
        <Link color="blue.500">{sharedUrl}</Link>
      </Box>
      <CopyToClipboard text={sharedUrl} onCopy={handleCopy}>
        <Button w={20}>コピー</Button>
      </CopyToClipboard>
    </HStack>
  )
}
