import { useRequireAuth } from "@/lib"
import { NextPageWithLayout } from "@/types"
import { Button, Center, Icon, Text, VStack } from "@chakra-ui/react"
import { signIn } from "next-auth/react"
import { useCallback } from "react"
import { FcGoogle } from "react-icons/fc"

const Home: NextPageWithLayout = () => {
  useRequireAuth({ allow: "unauthenticated" })

  const handleClick = useCallback(() => {
    signIn("google")
  }, [])

  return (
    <Center minH="100vh" textAlign="center">
      <VStack spacing={16}>
        <VStack spacing={4}>
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
          >
            Share your settings with the world!
          </Text>
          <Text fontWeight="bold" fontSize="2xl">
            お気に入りの設定をシェアしよう！
          </Text>
          <Text fontWeight="medium" fontSize="lg">
            対応: VS Code Extensions
          </Text>
          <Text fontWeight="medium" fontSize="lg">
            Coming Soon: Chrome Extensions, VS Code Settings
          </Text>
        </VStack>
        <Button
          leftIcon={<Icon w={8} h={8} as={FcGoogle} />}
          onClick={handleClick}
          size="lg"
        >
          Sign in with Google
        </Button>
      </VStack>
    </Center>
  )
}

export default Home
