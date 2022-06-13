import { FieldWrapper } from "@/components/forms"
import { EXTENSIONS_API, EXTENSIONS_IMPORT_API } from "@/constants"
import { Button, chakra, Input } from "@chakra-ui/react"
import { FormEvent, useCallback, useId, useRef, useState } from "react"
import { useSWRConfig } from "swr"

export function ImportForm() {
  const { mutate } = useSWRConfig()

  const [error, setError] = useState("")

  const inputRef = useRef<HTMLInputElement>(null)

  const id = useId()

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const file = inputRef.current?.files?.[0]

      if (!file) {
        setError("ファイルを選択してください")
        return
      }
      const params = new FormData()
      params.append("jsonFile", file)

      await fetch(EXTENSIONS_IMPORT_API, { method: "POST", body: params })

      mutate(EXTENSIONS_API)
    },
    [mutate]
  )

  return (
    <chakra.form onSubmit={handleSubmit}>
      <FieldWrapper
        htmlFor={id}
        label="extensions.jsonをインポート"
        error={error}
      >
        <Input id={id} type="file" accept=".json" ref={inputRef} />
      </FieldWrapper>
      <Button my={4} type="submit" colorScheme="blue">
        インポート
      </Button>
    </chakra.form>
  )
}
