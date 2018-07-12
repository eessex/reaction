import { Sans } from "@artsy/palette"
import { unica } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"
import { pMedia } from "../../../Helpers"
import { Byline } from "../../Byline/Byline"
import {
  Vertical,
  VerticalOrSeriesTitle,
} from "../../Sections/VerticalOrSeriesTitle"

export interface HeaderTextProps {
  article?: any
  date?: string
  editDeck?: any
  editTitle?: any
  editVertical?: any
}

export const HeaderText: React.SFC<HeaderTextProps> = props => {
  const { article, date, editDeck, editTitle, editVertical } = props
  const { hero_section, title } = article

  const type = (hero_section && hero_section.type) || "text"
  const deck = (hero_section && hero_section.deck) || editDeck
  const vertical = (article.vertical && article.vertical.name) || editVertical

  return (
    <TextContainer>
      <VerticalOrSeriesTitle article={article} vertical={vertical} />
      <Title>{editTitle || title}</Title>
      <SubHeader>
        {deck && (
          <Deck size="3t" weight="medium">
            {deck}
          </Deck>
        )}
        <Byline article={article} layout={type} date={date && date} />
      </SubHeader>
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

export const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
  ${pMedia.sm`
    align-items: flex-start;
    flex-direction: column;
  `};
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

export const Deck = Sans.extend`
  max-width: 460px;
  margin-right: 30px;

  ${pMedia.sm`
    margin-bottom: 28px;
  `};
`
