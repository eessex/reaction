import React from "react"
import styled from "styled-components"
import { resize } from "../../../../Utils/resizer"
import { HeaderText, Title } from "./HeaderText"

interface FeatureHeaderProps {
  article?: any
  date?: string
  editDeck?: any
  editImage?: any
  editVertical?: any
  editTitle?: any
}

export const TextHeader: React.SFC<FeatureHeaderProps> = props => {
  const { article, date, editDeck, editImage, editVertical, editTitle } = props
  const { hero_section } = article

  const url = (hero_section && hero_section.url) || ""
  const alt = url.length ? article.title : ""
  const src = url.length && resize(url, { width: 1200 })

  return (
    <TextHeaderContainer>
      <HeaderText
        article={article}
        date={date}
        editDeck={editDeck}
        editVertical={editVertical}
        editTitle={editTitle}
      />

      <Asset>
        {editImage}
        {url.includes("mp4") ? (
          <video
            src={url}
            autoPlay
            controls={false}
            loop
            muted
            playsInline
            width="100%"
          />
        ) : (
          url.length && <Image src={src} alt={alt} />
        )}
      </Asset>
    </TextHeaderContainer>
  )
}

const Image = styled.img`
  width: 100%;
  height: auto;
  box-sizing: border-box;
`

const Asset = styled.div`
  width: 100%;
  padding-top: 40px;
  box-sizing: border-box;
`

const TextHeaderContainer = styled.div`
  width: 100%;
  position: relative;
  height: auto;
  padding: 20px;
  margin-top: 50px;

  ${Title} {
    margin-bottom: 150px;
  }
`
