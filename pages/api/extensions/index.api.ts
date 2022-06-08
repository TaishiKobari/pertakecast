import { withUser } from "@/lib/api/withUser"
import { getService } from "@/pages/api/extensions/get"
import { User } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) => {
  switch (req.method) {
    case "GET": {
      const json = await getService(req, user)
      res.status(200).json(json)
      break
    }
    default:
      res.setHeader("Allow", ["GET"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
export default withUser(handler)
