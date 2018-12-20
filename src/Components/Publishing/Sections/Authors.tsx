import { Flex } from "@artsy/palette"
import React from "react"
import { Author } from "./Author"

interface AuthorsProps {
  color?: string
  authors: object[]
}

export const Authors: React.SFC<AuthorsProps> = props => {
  const { authors, color } = props
  return (
    <Flex flexDirection="column">
      {authors.map((author, i) => (
        <Author author={author} key={i} color={color} />
      ))}
    </Flex>
  )
}
