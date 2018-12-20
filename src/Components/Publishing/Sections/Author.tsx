import { Box, color, Flex, Sans } from "@artsy/palette"
import { pMedia } from "Components/Helpers"
import Icon from "Components/Icon"
import React from "react"
import Markdown from "react-markdown"
import styled from "styled-components"
import { resize } from "Utils/resizer"

interface AuthorProps {
  author: any
  color?: string
}

export const Author: React.SFC<AuthorProps> = props => {
  const { author } = props
  const profileImage = author.image_url ? (
    <ProfileImage mr="10px" src={resize(author.image_url, { width: 200 })} />
  ) : (
    false
  )
  return (
    <Flex alignItems="center" mb={20}>
      {profileImage}
      <AuthorInfo size={["3", "4"]} color={props.color} weight="medium">
        {author.bio && author.bio.length ? (
          <Markdown
            source={author.bio}
            disallowedTypes={["Paragraph"]}
            unwrapDisallowed
            containerTagName="span"
          />
        ) : (
          <div>{author.name}</div>
        )}
        {author.twitter_handle && author.twitter_handle.length ? (
          <Twitter>
            <TwitterHandle
              color={props.color}
              href={`http://twitter.com/${author.twitter_handle}`}
            >
              <Icon name="twitter" color={props.color || "black"} />
              {`@${author.twitter_handle}`}
            </TwitterHandle>
          </Twitter>
        ) : (
          false
        )}
      </AuthorInfo>
    </Flex>
  )
}

const ProfileImage = styled(Box)<{ src?: string }>`
  min-width: 60px;
  min-height: 60px;
  border-radius: 50%;
  background: url(${props => props.src || ""}) no-repeat center center;
  background-size: cover;

  ${pMedia.xs`
    min-width: 40px;
    min-height: 40px;
  `};
`

const AuthorInfo = styled(Sans)`
  display: block;

  a {
    color: ${props => props.color || color("black100")};
  }
`
const Twitter = styled.span`
  margin-left: 20px;
`
const TwitterHandle = styled.a`
  color: ${props => props.color || color("black100")};
  text-decoration: none;
  white-space: nowrap;

  ${Icon} {
    vertical-align: middle;
    margin: 0;
  }
`
