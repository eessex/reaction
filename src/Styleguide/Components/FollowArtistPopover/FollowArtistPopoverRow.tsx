import { Avatar, Box, Button, Flex, Separator } from "@artsy/palette"
import { FollowArtistPopoverRow_artist } from "__generated__/FollowArtistPopoverRow_artist.graphql"
import { FollowArtistPopoverRowMutation } from "__generated__/FollowArtistPopoverRowMutation.graphql"
import { ContextProps } from "Artsy"
import React from "react"
import { commitMutation, createFragmentContainer, graphql } from "react-relay"
import { RecordSourceSelectorProxy, SelectorData } from "relay-runtime"
import styled from "styled-components"
import { get } from "Utils/get"

interface Props extends ContextProps {
  artist: FollowArtistPopoverRow_artist
}

interface State {
  swappedArtist: FollowArtistPopoverRow_artist
}

class FollowArtistPopoverRow extends React.Component<Props, State> {
  state = {
    swappedArtist: null,
  }

  handleClick(artistID: string) {
    const { user, relay } = this.props
    if (user && user.id) {
      commitMutation<FollowArtistPopoverRowMutation>(relay.environment, {
        mutation: graphql`
          mutation FollowArtistPopoverRowMutation($input: FollowArtistInput!) {
            followArtist(input: $input) {
              artist {
                __id
                related {
                  suggested(first: 1, exclude_followed_artists: true) {
                    edges {
                      node {
                        __id
                        ...FollowArtistPopoverRow_artist @relay(mask: false)
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          input: { artist_id: artistID, unfollow: false },
        },
        updater: (store: RecordSourceSelectorProxy, data: SelectorData) => {
          const { node } = data.followArtist.artist.related.suggested.edges[0]
          this.setState({ swappedArtist: node })
        },
      })
    }
  }

  render() {
    const { artist: originalArtist } = this.props
    const { swappedArtist } = this.state
    const artist = swappedArtist || originalArtist
    const imageUrl = get(artist, a => a.image.cropped.url)
    const { _id: artistID } = artist
    return (
      <>
        <Flex my={2}>
          <Box mr={1}>
            <Avatar size="xs" src={imageUrl} />
          </Box>
          <Box mr={2}>
            <ArtistName>{artist.name}</ArtistName>
          </Box>
          <Box>
            <FollowButtonContainer>
              <Button
                onClick={() => this.handleClick(artistID)}
                variant="secondaryOutline"
                size="small"
                width="70px"
              >
                Follow
              </Button>
            </FollowButtonContainer>
          </Box>
        </Flex>
        <Separator />
      </>
    )
  }
}

const ArtistName = styled.div`
  width: 115px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 45px;
`

const FollowButtonContainer = styled.div`
  line-height: 45px;
`

export const FollowArtistPopoverRowFragmentContainer = createFragmentContainer(
  FollowArtistPopoverRow,
  graphql`
    fragment FollowArtistPopoverRow_artist on Artist {
      id
      _id
      __id
      name
      image {
        cropped(width: 45, height: 45) {
          url
        }
      }
      ...FollowArtistButton_artist
    }
  `
)
