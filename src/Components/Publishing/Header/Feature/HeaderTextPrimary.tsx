import { unica } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"
import { pMedia } from "../../../Helpers"
import {
  Vertical,
  VerticalOrSeriesTitle,
} from "../../Sections/VerticalOrSeriesTitle"
import { HeaderTextProps } from "./HeaderText"

export const HeaderTextPrimary: React.SFC<HeaderTextProps> = props => {
  const { article, editTitle, editVertical } = props
  const { title } = article
  const vertical = (article.vertical && article.vertical.name) || editVertical

  return (
    <PrimaryHeader>
      <VerticalOrSeriesTitle article={article} vertical={vertical} />
      <Title>{editTitle || title}</Title>
    </PrimaryHeader>
  )
}

export const PrimaryHeader = styled.div`
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
