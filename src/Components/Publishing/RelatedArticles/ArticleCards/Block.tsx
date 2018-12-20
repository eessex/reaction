import { Box } from "@artsy/palette"
import { unica } from "Assets/Fonts"
import {
  Vertical,
  VerticalOrSeriesTitle,
} from "Components/Publishing/Sections/VerticalOrSeriesTitle"
import { SeriesAbout } from "Components/Publishing/Series/SeriesAbout"
import { ArticleData } from "Components/Publishing/Typings"
import React from "react"
import styled from "styled-components"
import { ArticleCards } from "./ArticleCards"

interface Props {
  article?: ArticleData
  color?: string
  relatedArticles?: any
}

export const ArticleCardsBlock: React.SFC<Props> = props => {
  const { article, color, relatedArticles } = props
  const { seriesArticle } = article

  return (
    <ArticleCardsContainer color={color}>
      {(relatedArticles || article.relatedArticles) && (
        <Box maxWidth={1200} mx="auto">
          <VerticalOrSeriesTitle
            article={article}
            color={color}
            prefix="More in "
          />
          <ArticleCards
            relatedArticles={relatedArticles || article.relatedArticles}
            series={seriesArticle}
            color={color}
          />
        </Box>
      )}
      {seriesArticle && (
        <Box maxWidth={1200} mx="auto" pb={100} pt={[40, 40, 60]}>
          <SeriesAbout article={seriesArticle} color={color} />
        </Box>
      )}
    </ArticleCardsContainer>
  )
}

export const ArticleCardsContainer = styled(Box)`
  a {
    color: ${props => props.color || "black"};
  }

  ${Vertical} {
    ${unica("s32")};
    width: 100%;
    margin-bottom: 40px;

    a {
      border-bottom: 2px solid;
    }
  }
`
