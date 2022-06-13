import { HOME_PATH } from "@/constants"
import { Button, Flex, Link, Spacer } from "@chakra-ui/react"
import { signIn, signOut } from "next-auth/react"
import NextLink from "next/link"
import { useCallback } from "react"

type HeaderProps = {
  isLoggedIn: boolean
  hasButton?: boolean
}

export function Header({ isLoggedIn, hasButton = true }: HeaderProps) {
  const handleClick = useCallback(async () => {
    if (isLoggedIn) {
      await signOut({ callbackUrl: HOME_PATH })
    } else {
      await signIn("google")
    }
  }, [isLoggedIn])

  return (
    <Flex
      h={16}
      bgColor="gray.700"
      align="center"
      px={[4, 8]}
      position="sticky"
      top={0}
      zIndex="docked"
    >
      <NextLink href={HOME_PATH} passHref>
        <Link fontWeight="bold" color="white" fontSize={["3xl", "4xl"]}>
          pertakecast
        </Link>
      </NextLink>
      <Spacer />
      {hasButton && (
        <Button onClick={handleClick}>
          {isLoggedIn ? "ログアウト" : "ログイン"}
        </Button>
      )}
    </Flex>
  )
}
