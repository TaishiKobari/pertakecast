import { getUser } from "@/lib/api/user/getUser"
import { User } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

export function withUser(
  handler: (req: NextApiRequest, res: NextApiResponse, user: User) => void
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await getUser(req)
    if (!user) return res.status(401).end(`Unauthorized`)
    return handler(req, res, user)
  }
}
