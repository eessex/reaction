import { Box, Flex, Sans } from "@artsy/palette"
import React, { Component } from "react"
import track, { TrackingProp } from "react-tracking"
import styled from "styled-components"

import { PartnerBlock } from "Components/Publishing/Partner/PartnerBlock"
import { Text } from "Components/Publishing/Sections/Text"
import { ArticleData } from "Components/Publishing/Typings"
import { Media } from "Utils/Responsive"

interface Props {
  article?: ArticleData
  color?: string
  editDescription?: any
  editSubTitle?: any
  tracking?: TrackingProp
}

@track()
export class SeriesAbout extends Component<Props, null> {
  public static defaultProps: Partial<Props>

  componentDidMount() {
    const textLink = document.querySelector(".SeriesAbout__description a")
    if (textLink) {
      textLink.addEventListener("click", this.onClickFooterLink)
    }
  }

  onClickFooterLink = event => {
    this.props.tracking.trackEvent({
      action: "Click",
      flow: "Partner Footer CTA",
      type: "external_link",
      destination_path: event.currentTarget.href,
    })
  }

  render() {
    const {
      article: { series, sponsor },
      color,
      editDescription,
      editSubTitle,
    } = this.props

    const sponsorLogo =
      sponsor &&
      (color === "white"
        ? sponsor.partner_light_logo
        : sponsor.partner_dark_logo)

    return (
      <SeriesAboutContainer
        color={color || "black"}
        maxWidth="1200px"
        mx="auto"
        width="100%"
        flexDirection={["column", "row", "row"]}
      >
        <Flex
          width={[1, 1 / 3]}
          justifyContent="space-between"
          flexDirection="column"
        >
          <Sans size="8" mb={["20px", 0]}>
            {editSubTitle
              ? editSubTitle
              : (series && series.sub_title) || "About the Series"}
          </Sans>
          <Media greaterThanOrEqual="sm">
            {sponsor && (
              <Box mb={1}>
                <PartnerBlock
                  logo={sponsorLogo}
                  url={sponsor.partner_logo_link}
                  trackingData={{
                    type: "external link",
                    destination_path: sponsor.partner_logo_link,
                  }}
                />
              </Box>
            )}
          </Media>
        </Flex>

        <Flex width={[1, 2 / 3]} flexDirection="column">
          {editDescription ? (
            <Text layout="standard" color={color || "black"}>
              {editDescription}
            </Text>
          ) : (
            <div className="SeriesAbout__description">
              <Text
                layout="standard"
                color={color || "black"}
                html={series && series.description}
              />
            </div>
          )}
          <Media lessThan="sm">
            {sponsor && (
              <Box mt={60}>
                <PartnerBlock
                  logo={sponsorLogo}
                  url={sponsor.partner_logo_link}
                  trackingData={{
                    type: "external link",
                    destination_path: sponsor.partner_logo_link,
                  }}
                />
              </Box>
            )}
          </Media>
        </Flex>
      </SeriesAboutContainer>
    )
  }
}

export const SeriesAboutContainer = styled(Flex)``
