import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react"
import { ReactNode } from "react"

type FieldWrapperProps = {
  error: string | undefined
  children: ReactNode
  label: string
  htmlFor: string
}

export function FieldWrapper({
  error,
  children,
  label,
  htmlFor,
}: FieldWrapperProps) {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={htmlFor} fontWeight="bold" fontSize="2xl" pb={2}>
        {label}
      </FormLabel>
      {children}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}
