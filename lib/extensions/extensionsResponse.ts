import { OverwriteNest } from "@/types"
import { Extension, UserExtension } from "@prisma/client"
type ExtensionElement = Extension & {
  userExtensions: UserExtension[]
}

export type ExtensionsResponse = ExtensionElement[]

export type ExtensionsResponseInFE = OverwriteNest<
  ExtensionElement,
  { createdAt: string; updatedAt: string }
>[]
