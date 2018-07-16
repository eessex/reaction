import React from "react"
import styled from "styled-components"
import { resize } from "../../../../Utils/resizer"
import { pMedia } from "../../../Helpers"
import { PartnerInline } from "../../Partner/PartnerInline"
import { FeatureHeaderProps } from "../FeatureHeader"
import { HeaderText } from "./HeaderText/HeaderText"

// TODO: track partner superarticle link clicks
export const FullscreenHeader: React.SFC<FeatureHeaderProps> = props => {
  const { article, date, editDeck, editImage, editVertical, editTitle } = props
  const {
    hero_section,
    is_super_article,
    seriesArticle,
    super_article,
  } = article

  const url = (hero_section && hero_section.url) || ""
  const isVideo = url.includes("mp4")
  const src = !isVideo && url.length && resize(url, { width: 1600 })

  return (
    <FeatureHeaderContainer hasNav={seriesArticle && true}>
      <FeatureAssetContainer src={src}>
        {editImage && editImage}
        {isVideo && (
          <FeatureVideo
            src={url}
            autoPlay
            controls={false}
            loop
            muted
            playsInline
          />
        )}
      </FeatureAssetContainer>
      <Overlay />

      <HeaderTextContainer hasLogos={is_super_article}>
        {is_super_article && (
          <PartnerInline
            logo={
              super_article.partner_fullscreen_header_logo ||
              super_article.partner_logo
            }
            url={super_article.partner_logo_link}
            color="white"
          />
        )}
        <HeaderText
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

const Overlay = styled.div`
  position: absolute;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.3)
  );
`

const HeaderTextContainer = styled.div.attrs<{ hasLogos?: boolean }>({})`
  height: 100%;
  color: #fff;
  text-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.hasLogos ? "space-between" : "flex-end")};
  .PartnerInline {
    position: relative;
  }
  ${pMedia.xs`
    padding: 20px;
  `};
`

const FeatureVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const FeatureAssetContainer = styled.div.attrs<{ src?: string }>({})`
  width: 100%;
  height: 100%;
  right: 0;
  position: absolute;
  overflow: hidden;
  ${props =>
    props.src &&
    `
    background-image: url(${props.src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  `};
`

const FeatureHeaderContainer = styled.div.attrs<{ hasNav?: boolean }>({})`
  width: 100%;
  position: relative;
  height: ${props => (props.hasNav ? "100vh" : "calc(100vh - 50px)")};
  ${props =>
    !props.hasNav &&
    `
    margin-top: 50px;
  `};
`
