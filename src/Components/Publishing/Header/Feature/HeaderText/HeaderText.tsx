import { unica } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"
import { pMedia } from "../../../../Helpers"
import {
  Vertical,
  VerticalOrSeriesTitle,
} from "../../../Sections/VerticalOrSeriesTitle"
import { HeaderTextSub } from "./HeaderTextSub"

export interface HeaderTextProps {
  article?: any
  date?: string
  editDeck?: any
  editTitle?: any
  editVertical?: any
}

export const HeaderText: React.SFC<HeaderTextProps> = props => {
  const { article, editTitle, editVertical } = props
  const { title } = article
  const vertical = (article.vertical && article.vertical.name) || editVertical

  return (
    <TextContainer>
      <div>
        <VerticalOrSeriesTitle article={article} vertical={vertical} />
        <Title>{editTitle || title}</Title>
      </div>
      <HeaderTextSub {...props} />
    </TextContainer>
  )
}

export const TextContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  ${Vertical} {
    margin-bottom: 10px;
  }
`

export const Title = styled.div`
  ${unica("s100")};
  margin-bottom: 75px;
  letter-spacing: -0.035em;
  ${pMedia.xl`
    ${unica("s80")}
  `} ${pMedia.md`
    ${unica("s65")}
  `} ${pMedia.xs`
    ${unica("s45")}
  `};
`
