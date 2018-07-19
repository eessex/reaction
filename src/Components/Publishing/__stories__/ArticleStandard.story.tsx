import { storiesOf } from "@storybook/react"
import { Article } from "Components/Publishing/Article"
import React from "react"

import {
  ImageHeavyStandardArticle,
  MissingVerticalStandardArticle,
  StandardArticle,
} from "../Fixtures/Articles"

import { ContextProvider } from "../../Artsy"
import { Display, RelatedCanvas, RelatedPanel } from "../Fixtures/Components"
import { ArticleData } from "../Typings"

const shortArticle: ArticleData = {
  ...StandardArticle,
  sections: [
    {
      type: "text",
      body: "<p>What would Antoine Court?</p>",
    },
  ],
}

const story = storiesOf("Publishing/Articles/Standard", module)
  .add("Standard", () => {
    return (
      <ContextProvider>
        <Article
          article={StandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
        />
      </ContextProvider>
    )
  })
  .add("No Vertical", () => {
    return (
      <ContextProvider>
        <Article
          article={MissingVerticalStandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
        />
      </ContextProvider>
    )
  })
  .add("Truncated", () => {
    return (
      <ContextProvider>
        <Article
          article={ImageHeavyStandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          isTruncated
        />
      </ContextProvider>
    )
  })
  .add("Tooltips", () => {
    return (
      <ContextProvider>
        <Article
          article={StandardArticle}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          showTooltips
        />
      </ContextProvider>
    )
  })

const displays = ["overlay", "image", "video", "slideshow"]
displays.forEach(displayType => {
  story.add(`${displayType} ad`, () => {
    return (
      <ContextProvider>
        <Article
          article={shortArticle}
          display={Display(displayType)}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
        />
      </ContextProvider>
    )
  })
})

story.add(`Infinite scroll`, () => {
  return (
    <ContextProvider>
      <div>
        <Article
          article={shortArticle}
          display={Display("slideshow")}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
        />
        <Article
          article={StandardArticle}
          display={Display("video")}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          isTruncated
        />
        <Article
          article={StandardArticle}
          display={Display("image")}
          relatedArticlesForPanel={RelatedPanel}
          relatedArticlesForCanvas={RelatedCanvas}
          isTruncated
        />
      </div>
    </ContextProvider>
  )
})
