import { Box, Flex } from "@artsy/palette"
import { ArticleProps } from "Components/Publishing/Article"
import React from "react"
import styled from "styled-components"
import { Header } from "../Header/Header"
import { Nav, NavContainer } from "../Nav/Nav"
import {
  ArticleCardsBlock,
  ArticleCardsContainer,
} from "../RelatedArticles/ArticleCards/Block"
import { Sections } from "../Sections/Sections"
import { CanvasFooter } from "./Components/CanvasFooter"

export const FeatureLayout: React.SFC<ArticleProps> = props => {
  const {
    article,
    backgroundColor,
    customEditorial,
    color,
    display,
    isMobile,
    isSuper,
    relatedArticlesForCanvas,
    renderTime,
    showTooltips,
  } = props
  const { seriesArticle, hero_section } = article

  const hasNav = seriesArticle && article.hero_section
  const sponsor = (seriesArticle && seriesArticle.sponsor) || article.sponsor
  const seriesOrSuper = isSuper || seriesArticle

  return (
    <FeatureLayoutContainer
      background={backgroundColor}
      pt={hasNav && hero_section.type !== "fullscreen" ? "50px" : 0}
    >
      {hasNav && (
        <Nav
          backgroundColor={backgroundColor}
          color={
            color
              ? color
              : article.hero_section.type === "fullscreen"
                ? "white"
                : "black"
          }
          canFix={false}
          sponsor={sponsor}
          title={seriesArticle.title}
          transparent
        />
      )}
      <Header article={article} textColor={color} />

      <Flex width="100%">
        <Sections
          article={article}
          isMobile={isMobile}
          showTooltips={showTooltips}
          color={color}
        />
      </Flex>

      {seriesArticle && <ArticleCardsBlock {...props} />}

      {(relatedArticlesForCanvas || display) &&
        !seriesOrSuper &&
        !customEditorial && (
          <CanvasFooter
            article={article}
            display={display}
            relatedArticles={relatedArticlesForCanvas}
            renderTime={renderTime}
          />
        )}
    </FeatureLayoutContainer>
  )
}

const FeatureLayoutContainer = styled(Box)`
  position: relative;

  ${NavContainer} {
    position: absolute;
  }

  ${ArticleCardsContainer} {
    padding-top: 60px;
  }
`
