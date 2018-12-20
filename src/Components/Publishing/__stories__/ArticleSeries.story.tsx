import { storiesOf } from "@storybook/react"
import { ArticleData } from "Components/Publishing/Typings"
import { clone } from "lodash"
import React from "react"
import { Article } from "../Article"

import {
  SeriesArticle,
  SeriesArticleSponsored,
  StandardArticle,
  VideoArticle,
} from "../Fixtures/Articles"

storiesOf("Publishing/Articles/Series", module)
  .add("Series", () => {
    return (
      <Article
        article={SeriesArticle}
        relatedArticles={[StandardArticle, VideoArticle]}
      />
    )
  })
  .add("Sponsored", () => {
    return (
      <Article
        article={SeriesArticleSponsored}
        relatedArticles={[StandardArticle, VideoArticle]}
      />
    )
  })
  .add("Custom colors", () => {
    const article = clone({
      ...SeriesArticleSponsored,
    } as ArticleData)
    delete article.hero_section.url

    return (
      <Article
        color="cornsilk"
        backgroundColor="coral"
        article={article}
        relatedArticles={[StandardArticle, VideoArticle]}
      />
    )
  })
