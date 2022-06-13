import { getUser } from "@/lib/api/user/getUser"
import { patchService } from "@/pages/api/user/patch"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUser(req)
  switch (req.method) {
    case "GET": {
      res.status(200).json(user)
      break
    }
    case "PATCH":
      if (!user) return res.status(401).end(`Unauthorized`)
      const json = await patchService(req, user)
      res.status(200).json(json)
      break
    default:
      res.setHeader("Allow", ["GET"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
export default handler
