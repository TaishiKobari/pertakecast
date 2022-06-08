import { NextApiRequest } from "next"
import { getSession } from "next-auth/react"

import { prisma } from "@/lib/api/prisma"

export async function getUser(req: NextApiRequest) {
  const session = await getSession({ req })

  if (!session) return null
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  })
  if (!user) throw "セッションのユーザーIDが不正です"
  return user
}
