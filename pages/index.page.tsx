import { useRequireAuth } from "@/lib"
import { NextPageWithLayout } from "@/types"
import { Box, Button } from "@chakra-ui/react"
import { signIn } from "next-auth/react"

const Home: NextPageWithLayout = () => {
  useRequireAuth({ allow: "stranger" })
  return (
    <Box>
      <Button onClick={() => signIn()}>login</Button>
    </Box>
  )
}

export default Home
