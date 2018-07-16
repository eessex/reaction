import React from "react"
import styled from "styled-components"
import { track } from "../../../../Utils/track"
import { pMedia } from "../../../Helpers"
import { BylineContainer } from "../../Byline/Byline"
import { ShareContainer } from "../../Byline/Share"
import {
  CoverImage,
  IFrame,
  isValidVideoUrl,
  Video,
  VIDEO_RATIO,
} from "../../Sections/Video"
import { FeatureHeaderProps } from "../FeatureHeader"
import { HeaderText, Title } from "./HeaderText/HeaderText"
import { Deck, SubHeader } from "./HeaderText/HeaderTextSub"

interface State {
  isPlaying: boolean
}

export class BasicHeader extends React.Component<
  FeatureHeaderProps & { tracking?: any },
  State
> {
  trackVideoPlay = () => {
    const { tracking } = this.props
    tracking.trackEvent({
      action: "Click",
      label: "Track Basic feature video click ",
      impression_type: "sa_basic_feature_video",
      context_type: "article_fixed",
    })
  }

  render() {
    const { article, date, editTitle, editVertical, editDeck } = this.props
    const { hero_section } = article
    const { url } = hero_section
    const hasVideo = url && isValidVideoUrl(url)

    return (
      <BasicHeaderContainer hasVideo={hasVideo}>
        {hasVideo && (
          <VideoContainer onClick={this.trackVideoPlay}>
            <Video section={hero_section} layout="feature" />
          </VideoContainer>
        )}
        <HeaderText
          article={article}
          date={date}
          editDeck={editDeck}
          editVertical={editVertical}
          editTitle={editTitle}
        />
      </BasicHeaderContainer>
    )
  }
}

export const VideoContainer = styled.div`
  width: 100%;
`

const BasicHeaderContainer = styled.div.attrs<{ hasVideo: boolean }>({})`
  text-align: center;
  margin-top: ${props => (props.hasVideo ? "30" : "70")}px;
  padding: 20px;

  ${CoverImage}, ${IFrame} {
    width: 100%;

    @media screen and (min-width: 1250px) {
      height: ${1100 * VIDEO_RATIO}px;
    }
    ${pMedia.xl`
      height: ${1100 * VIDEO_RATIO}px;
    `}
    ${pMedia.lg`
      height: ${950 * VIDEO_RATIO}px;
    `}
    ${pMedia.md`
      height: ${800 * VIDEO_RATIO}px;
    `}
    ${pMedia.sm`
      height: ${620 * VIDEO_RATIO}px;
    `}
    ${pMedia.xs`
      height: ${340 * VIDEO_RATIO}px;
      margin-top: 25px;
      margin-bottom: -25px;
    `}
  }

  ${Title} {
    max-width: 1250px;
    margin: 0 auto 27px auto;
    ${pMedia.xs`
      margin-bottom: 15px;
    `}
  }

  ${SubHeader} {
    max-width: 680px;
    flex-direction: column;
    margin: auto;
    align-items: center;
  }

  ${Deck} {
    padding-right: 0px;
    margin-right: 0;
    margin-bottom: 10px;
    max-width: 100%;
  }

  ${BylineContainer} {
    justify-content: center;

    div {
      padding-right: 30px;
    }

    ${ShareContainer} {
      padding-right: 0;
    }

    ${pMedia.xs`
      flex-direction: column;
      align-items: center;

      div {
        padding-right: 0;
        margin-right: 0;
      }

      ${ShareContainer} {
        margin-top: 10px;
      }
    `}
  }
`

export default track()(BasicHeader)
