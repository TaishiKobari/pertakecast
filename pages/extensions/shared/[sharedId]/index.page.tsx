import { Extensions, Header } from "@/components"
import { Box } from "@chakra-ui/react"
import { GetServerSideProps } from "next"

import { ExtensionsResponseInFE } from "@/lib"
import { prisma } from "@/lib/api/prisma"

type SharedExtensionsProps = {
  extensions: string
}

const SharedExtensions = ({ extensions }: SharedExtensionsProps) => {
  const parsedExtensions: ExtensionsResponseInFE = JSON.parse(extensions)
  return (
    <>
      <Header isLoggedIn={false} hasButton={false} />
      <Box pt={8}>
        <Extensions extensions={parsedExtensions ?? []} />
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const sharedId = params?.sharedId

  if (Array.isArray(sharedId) || sharedId === undefined)
    return { notFound: true }

  const user = await prisma.user.findUnique({
    where: { sharedId },
  })

  if (!user || !user.isPublic) return { notFound: true }

  const extensions = await prisma.extension.findMany({
    where: { userExtensions: { some: { userId: user.id } } },
    include: { userExtensions: { where: { userId: user.id } } },
  })

  return { props: { extensions: JSON.stringify(extensions) } }
}

export default SharedExtensions
