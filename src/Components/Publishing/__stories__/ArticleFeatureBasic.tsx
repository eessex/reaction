import { storiesOf } from "@storybook/react"
import { ContextProvider } from "Artsy"
import { Article } from "Components/Publishing/Article"
import {
  BasicArticle,
  FeatureArticle,
  SeriesArticleSponsored,
  SuperArticle,
} from "Components/Publishing/Fixtures/Articles"
import {
  Display,
  RelatedCanvas,
} from "Components/Publishing/Fixtures/Components"
import { ArticleData } from "Components/Publishing/Typings"
import { clone } from "lodash"
import React from "react"

storiesOf("Publishing/Articles/FeatureBasic", module)
  .add("Basic", () => {
    const article = clone({
      ...BasicArticle,
      sections: [
        {
          type: "text",
          body:
            "<p>The Black Power Tarot was conceived by musician King Khan in consultation with Alejandro Jodorowsky, and designed by illustrator Michael Eaton in 2015. The deck celebrates the strength and achievements of Black musicians, artists, and activists while staying faithful to the imagery and composition of the classic Tarot de Marseilles.</p>",
        },
      ],
    } as ArticleData)

    return (
      <ContextProvider>
        <Article
          article={article}
          display={Display("image")}
          relatedArticlesForCanvas={RelatedCanvas}
          isTruncated
          showTooltips
        />
      </ContextProvider>
    )
  })
  .add("Basic series", () => {
    const article = clone({
      ...FeatureArticle,
      hero_section: {
        type: "basic",
        url: FeatureArticle.hero_section.url,
      },
      seriesArticle: SeriesArticleSponsored,
      relatedArticles: [BasicArticle, SuperArticle],
    } as ArticleData)

    return (
      <ContextProvider>
        <Article article={article} showTooltips />
      </ContextProvider>
    )
  })
