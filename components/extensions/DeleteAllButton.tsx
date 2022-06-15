import { EXTENSIONS_API } from "@/constants"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react"
import { useCallback, useRef } from "react"
import { useSWRConfig } from "swr"

export function DeleteAllButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

  const { mutate } = useSWRConfig()

  const onDelete = useCallback(async () => {
    try {
      await fetch(EXTENSIONS_API, { method: "DELETE" })
      onClose()
      mutate(EXTENSIONS_API)
    } catch (error) {
      console.warn(error)
    }
  }, [mutate, onClose])

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        すべての拡張機能を削除
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              すべての拡張機能を削除
            </AlertDialogHeader>

            <AlertDialogBody>本当に削除しますか？</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                削除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
