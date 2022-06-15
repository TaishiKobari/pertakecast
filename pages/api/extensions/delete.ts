import { prisma } from "@/lib/api/prisma"
import { User } from "@prisma/client"
import { NextApiRequest } from "next"

export async function deleteService(req: NextApiRequest, user: User) {
  const result = await prisma.userExtension.deleteMany({
    where: { userId: user.id },
  })

  return {
    data: result,
  }
}
