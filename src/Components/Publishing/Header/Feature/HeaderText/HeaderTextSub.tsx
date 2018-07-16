import { Sans } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { pMedia } from "../../../../Helpers"
import { Byline } from "../../../Byline/Byline"
import { HeaderTextProps } from "./HeaderText"

export const HeaderTextSub: React.SFC<HeaderTextProps> = props => {
  const { article, date, editDeck } = props
  const { hero_section } = article

  const type = (hero_section && hero_section.type) || "text"
  const deck = (hero_section && hero_section.deck) || editDeck

  return (
    <SubHeader>
      {deck && (
        <Deck size="3t" weight="medium">
          {deck}
        </Deck>
      )}
      <Byline article={article} layout={type} date={date && date} />
    </SubHeader>
  )
}

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

export const Deck = Sans.extend`
  max-width: 460px;
  margin-right: 30px;

  ${pMedia.sm`
    margin-bottom: 28px;
  `};
`
