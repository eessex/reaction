import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import {
  SeriesArticle,
  SeriesArticleSponsored,
  StandardArticle,
  VideoArticle
} from "../../Fixtures/Articles"
import { SeriesLayout } from "../SeriesLayout"

it("renders a series properly", () => {
  SeriesArticle.relatedArticles = [VideoArticle, StandardArticle]

  const series = renderer.create(
    <SeriesLayout article={SeriesArticle} />
  ).toJSON()
  expect(series).toMatchSnapshot()
})

it("renders a sponsored series properly", () => {
  SeriesArticleSponsored.relatedArticles = [VideoArticle, StandardArticle]

  const series = renderer.create(
    <SeriesLayout article={SeriesArticleSponsored} />
  ).toJSON()
  expect(series).toMatchSnapshot()
})
