import { ErrorResponse } from "@/lib/api/error"
import { prisma } from "@/lib/api/prisma"
import { User } from "@prisma/client"
import formidable from "formidable"
import { readFile } from "fs/promises"
import { NextApiRequest } from "next"

type ImportExtension = {
  identifier: {
    id: string
  }
  version: string
  installed: boolean
}

function isObject(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === "object" && obj !== null
}

function isImportExtension(extension: unknown): extension is ImportExtension {
  if (!isObject(extension)) return false

  if (!extension.hasOwnProperty("identifier")) return false
  if (!extension.hasOwnProperty("version")) return false
  if (!extension.hasOwnProperty("installed")) return false

  if (!isObject(extension.identifier)) return false

  if (typeof extension.identifier.id !== "string") return false
  if (typeof extension.version !== "string") return false
  if (typeof extension.installed !== "boolean") return false
  return true
}

export async function postService(req: NextApiRequest, user: User) {
  const form = formidable({})

  const extensions = await new Promise<unknown[]>(function (resolve, reject) {
    form.parse(req, async function (err, _, files) {
      if (err) {
        reject(err)
        return
      }

      const jsonFile = files.jsonFile

      if (jsonFile === undefined || Array.isArray(jsonFile)) {
        reject({ error: ErrorResponse.BadRequest })
        return
      }

      const path = jsonFile.filepath
      const content = await readFile(path, { encoding: "utf8" })

      const json = JSON.parse(content)

      if (!Array.isArray(json)) {
        reject({ error: ErrorResponse.BadRequest })
        return
      }

      resolve(json)
    })
  })

  const promises = extensions.flatMap((extension) => {
    if (!isImportExtension(extension)) return []
    if (!extension.installed) return []

    const promise = prisma.extension.upsert({
      where: { extensionId: extension.identifier.id },
      create: {
        extensionId: extension.identifier.id,
        userExtensions: {
          create: {
            version: extension.version,
            user: { connect: { id: user.id } },
          },
        },
      },
      update: {
        userExtensions: {
          upsert: {
            where: {
              userId_extensionId: {
                userId: user.id,
                extensionId: extension.identifier.id,
              },
            },
            create: {
              version: extension.version,
              user: { connect: { id: user.id } },
            },
            update: {
              version: extension.version,
            },
          },
        },
      },
    })

    return promise
  })

  const results = await Promise.all(promises)

  return results
}
