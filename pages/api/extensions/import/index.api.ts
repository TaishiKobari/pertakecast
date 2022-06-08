import { withUser } from "@/lib/api/withUser"
import { postService } from "@/pages/api/extensions/import/post"
import { User } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) => {
  switch (req.method) {
    case "POST": {
      const json = await postService(req, user)
      res.status(200).json(json)
      break
    }
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default withUser(handler)
