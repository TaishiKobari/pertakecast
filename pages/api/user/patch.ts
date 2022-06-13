import { prisma } from "@/lib/api/prisma"
import { User } from "@prisma/client"
import { NextApiRequest } from "next"

import { UserPatchRequestBody } from "@/lib"
import { randomUUID } from "crypto"

export async function patchService(req: NextApiRequest, user: User) {
  const { isPublic }: UserPatchRequestBody = JSON.parse(req.body)

  const sharedId = !user.sharedId && isPublic ? randomUUID() : undefined

  console.log({ sharedId, isPublic }, user.sharedId, req.body)

  return await prisma.user.update({
    where: { id: user.id },
    data: {
      isPublic,
      ...(sharedId && { sharedId }),
    },
  })
}
