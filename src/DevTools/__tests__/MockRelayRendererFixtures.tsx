import { MockRelayRendererFixtures_artist } from "__generated__/MockRelayRendererFixtures_artist.graphql"
import { MockRelayRendererFixtures_artwork } from "__generated__/MockRelayRendererFixtures_artwork.graphql"
import { MockRelayRendererFixtures_artworkMetadata } from "__generated__/MockRelayRendererFixtures_artworkMetadata.graphql"
import { MockRelayRendererFixturesArtistQuery } from "__generated__/MockRelayRendererFixturesArtistQuery.graphql"
import { SystemContextConsumer } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import cheerio from "cheerio"
import { render } from "enzyme"
import * as React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"

const Metadata = createFragmentContainer(
  (props: { artworkMetadata: MockRelayRendererFixtures_artworkMetadata }) => (
    <div>{props.artworkMetadata.title}</div>
  ),
  {
    artworkMetadata: graphql`
      fragment MockRelayRendererFixtures_artworkMetadata on Artwork {
        title
      }
    `,
  }
)

export const Artwork = createFragmentContainer(
  (props: { artwork: MockRelayRendererFixtures_artwork }) => {
    const {
      artwork: { image },
    } = props
    return (
      <div>
        {image && image.url && <img src={image.url} />}
        <Metadata artworkMetadata={props.artwork} />
        {props.artwork.artist && (
          <ArtistQueryRenderer id={props.artwork.artist.id} />
        )}
      </div>
    )
  },
  {
    artwork: graphql`
      fragment MockRelayRendererFixtures_artwork on Artwork {
        image {
          url
        }
        artist {
          id
        }
        ...MockRelayRendererFixtures_artworkMetadata
      }
    `,
  }
)

const Artist = createFragmentContainer(
  (props: { artist: MockRelayRendererFixtures_artist }) => (
    <div>{props.artist.name}</div>
  ),
  {
    artist: graphql`
      fragment MockRelayRendererFixtures_artist on Artist {
        name
      }
    `,
  }
)

const ArtistQueryRenderer = (props: { id: string }) => (
  <SystemContextConsumer>
    {({ relayEnvironment }) => {
      if (relayEnvironment) {
        return (
          <QueryRenderer<MockRelayRendererFixturesArtistQuery>
            environment={relayEnvironment}
            variables={props}
            query={graphql`
              query MockRelayRendererFixturesArtistQuery($id: String!) {
                artist(id: $id) {
                  ...MockRelayRendererFixtures_artist
                }
              }
            `}
            render={renderWithLoadProgress(Artist)}
          />
        )
      }
    }}
  </SystemContextConsumer>
)

export const query = graphql`
  query MockRelayRendererFixturesQuery {
    artwork(id: "mona-lisa") {
      ...MockRelayRendererFixtures_artwork
    }
  }
`

// Bad query has a misnamed top-level property.
export const badQuery = graphql`
  query MockRelayRendererFixturesBadQuery {
    something_that_is_not_expected: artwork(id: "mona-lisa") {
      ...MockRelayRendererFixtures_artwork
    }
  }
`

export function renderToString(element: JSX.Element) {
  return cheerio.html(render(element))
}
