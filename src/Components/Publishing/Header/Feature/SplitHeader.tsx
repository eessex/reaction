import { space } from "@artsy/palette"
import React from "react"
import { Col, Row } from "react-styled-flexboxgrid"
import styled from "styled-components"
import { resize } from "../../../../Utils/resizer"
import { pMedia } from "../../../Helpers"
import { BylineContainer } from "../../Byline/Byline"
import { FeatureHeaderProps } from "../FeatureHeader"
import { HeaderText, TextContainer, Title } from "./HeaderText/HeaderText"
import { HeaderTextSub, SubHeader } from "./HeaderText/HeaderTextSub"

export const SplitHeader: React.SFC<FeatureHeaderProps> = props => {
  const { article, date, editDeck, editImage, editVertical, editTitle } = props
  const { hero_section, seriesArticle } = article

  const url = (hero_section && hero_section.url) || ""
  const isVideo = url.includes("mp4")
  const src = !isVideo && url.length && resize(url, { width: 1600 })

  return (
    <FeatureHeaderContainer hasNav={seriesArticle && true}>
      <HeaderTextContainer xs={12} sm={5}>
        <HeaderText
          article={article}
          date={date}
          editDeck={editDeck}
          editVertical={editVertical}
          editTitle={editTitle}
        />
      </HeaderTextContainer>

      <FeatureAssetContainer src={src} xs={12} sm={6}>
        {editImage && <EditImage>{editImage}</EditImage>}
        {isVideo ? (
          <FeatureVideo
            src={url}
            autoPlay
            controls={false}
            loop
            muted
            playsInline
          />
        ) : (
          src && <Img src={src} />
        )}
      </FeatureAssetContainer>
      <HeaderTextContainer xs={12} sm={false}>
        <HeaderTextSub
          article={article}
          date={date}
          editDeck={editDeck}
          editVertical={editVertical}
          editTitle={editTitle}
        />
      </HeaderTextContainer>
    </FeatureHeaderContainer>
  )
}

const HeaderTextContainer = Col.extend`
  padding-left: ${space(2)}px;
  padding-right: ${space(2)}px;
  padding-top: ${space(2)}px;
  padding-bottom: ${space(2)}px;

  ${TextContainer} {
    height: 100%;
    justify-content: space-between;
  }

  ${SubHeader} {
    display: block;
  }

  ${BylineContainer} {
    margin-top: ${space(3)}px;
  }

  ${pMedia.sm`
    ${Title} {
      margin-bottom: 20px;
    }
    ${TextContainer} {
      ${SubHeader} {
        display: none;
      }
    }
  `};
`

const FeatureVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${pMedia.sm`
    height: auto;
  `};
`

const FeatureAssetContainer = Col.extend.attrs<{ src?: string }>({})`
  height: 100%;
  flex: 1;
  overflow: hidden;
  margin: 0 ${space(2)}px;
  padding-left: 0;
  padding-right: 0;

  ${props =>
    props.src &&
    `
    background-image: url(${props.src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  `};
  ${pMedia.sm`
    height: fit-content;
    ${props =>
      props.src &&
      `
      background-image: none;
      height: fit-content;
    `}
  `};
`

const Img = styled.img`
  width: 100%;
`

const FeatureHeaderContainer = Row.extend.attrs<{ hasNav?: boolean }>({})`
  margin-left: 0;
  margin-right: 0;
  height: ${props => (props.hasNav ? "100vh" : "calc(100vh - 50px)")};
  justify-content: space-between;
  ${props =>
    !props.hasNav &&
    `
    margin-top: 50px;
  `};
`

export const EditImage = styled.div`
  position: absolute;
`
