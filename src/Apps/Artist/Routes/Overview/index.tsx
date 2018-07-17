import { Sans } from "@artsy/palette"
import { Overview_artist } from "__generated__/Overview_artist.graphql"
import { ArtworkFilterFragmentContainer as ArtworkFilter } from "Apps/Artist/Routes/Overview/Components/ArtworkFilter"
import { GenesFragmentContainer as Genes } from "Apps/Artist/Routes/Overview/Components/Genes"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistBioFragmentContainer as ArtistBio } from "Styleguide/Components/ArtistBio"
import { MarketInsightsFragmentContainer as MarketInsights } from "Styleguide/Components/MarketInsights"
import { SelectedExhibitionFragmentContainer as SelectedExhibitions } from "Styleguide/Components/SelectedExhibitions"
import { Box } from "Styleguide/Elements/Box"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Spacer } from "Styleguide/Elements/Spacer"
import { CurrentEventFragmentContainer as CurrentEvent } from "./Components/CurrentEvent"

export interface OverviewRouteProps {
  artist: Overview_artist
}

const OverviewRoute: SFC<OverviewRouteProps> = props => {
  const { artist } = props

  return (
    <React.Fragment>
      <Row>
        <Col sm={9}>
          <MarketInsights artist={artist as any} />
          <Spacer mb={1} />

          <SelectedExhibitions
            artistID={artist.id}
            totalExhibitions={props.artist.counts.partner_shows}
            exhibitions={props.artist.exhibition_highlights as any}
          />

          <Box mt={3} mb={1}>
            <ArtistBio bio={artist as any} />
          </Box>

          <Genes artist={artist as any} />

          <Spacer mb={1} />

          {artist.is_consignable && (
            <Sans size="2" color="black60">
              Want to sell a work by this artist?{" "}
              <a href="/consign">Learn more</a>.
            </Sans>
          )}
        </Col>
        <Col sm={3}>
          <Box pl={2}>
            <CurrentEvent artist={artist as any} />
          </Box>
        </Col>
      </Row>

      <Spacer mb={4} />

      <Row>
        <Col>
          <span id="jump--artistArtworkGrid" />

          <ArtworkFilter artist={artist as any} />
        </Col>
      </Row>
    </React.Fragment>
  )
}

export const OverviewRouteFragmentContainer = createFragmentContainer(
  OverviewRoute,
  graphql`
    fragment Overview_artist on Artist {
      ...ArtistHeader_artist
      ...ArtistBio_bio
      ...CurrentEvent_artist
      ...MarketInsightsArtistPage_artist
      id
      exhibition_highlights(size: 3) {
        ...SelectedExhibitions_exhibitions
      }
      counts {
        partner_shows
      }

      is_consignable

      ...Genes_artist

      ...ArtworkFilter_artist
    }
  `
)
