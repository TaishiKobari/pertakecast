import { User } from "@prisma/client"
import { NextApiRequest } from "next"

import { ExtensionsResponse } from "@/lib"

import { prisma } from "@/lib/api/prisma"

export async function getService(
  req: NextApiRequest,
  user: User
): Promise<ExtensionsResponse> {
  const extensions = await prisma.extension.findMany({
    where: { userExtensions: { some: { userId: user.id } } },
    include: { userExtensions: { where: { userId: user.id } } },
  })

  return extensions
}
