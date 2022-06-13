import { StarIcon } from "@chakra-ui/icons"
import { HStack, SkeletonCircle } from "@chakra-ui/react"
import { Fragment } from "react"

type RatingProps = {
  rate: number | undefined
}

export function Rating({ rate }: RatingProps) {
  if (rate !== undefined && (rate < 0 || rate > 5)) return <></>
  return (
    <HStack spacing={0}>
      {[1, 2, 3, 4, 5].map((index) => (
        <Fragment key={index}>
          {rate === undefined ? (
            <SkeletonCircle size="4" />
          ) : index <= rate ? (
            <StarIcon color="orange.300" />
          ) : (
            <StarIcon color="gray.300" />
          )}
        </Fragment>
      ))}
    </HStack>
  )
}
