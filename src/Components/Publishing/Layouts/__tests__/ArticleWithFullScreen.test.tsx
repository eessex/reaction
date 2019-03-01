import { Eoy2018Culture } from "Components/Publishing/EditorialFeature/Components/Eoy2018Culture"
import { EditorialFeature } from "Components/Publishing/EditorialFeature/EditorialFeature"
import { Eoy2018Culture as Eoy2018CultureFixture } from "Components/Publishing/EditorialFeature/Fixtures/Eoy2018Culture"
import {
  FeatureArticle,
  StandardArticle,
} from "Components/Publishing/Fixtures/Articles"
import {
  Display,
  RelatedCanvas,
  RelatedPanel,
} from "Components/Publishing/Fixtures/Components"
import { RelatedArticlesCanvas } from "Components/Publishing/RelatedArticles/Canvas/RelatedArticlesCanvas"
import { RelatedArticlesPanel } from "Components/Publishing/RelatedArticles/Panel/RelatedArticlesPanel"
import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { ArticleWithFullScreen } from "../ArticleWithFullScreen"
import { FeatureLayout } from "../FeatureLayout"
import { StandardLayout } from "../StandardLayout"

jest.mock("isomorphic-fetch")
declare const global: any
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({}),
  })
)

jest.mock(
  "Components/Publishing/Sections/FullscreenViewer/withFullScreen",
  () => ({
    withFullScreen: x => x,
  })
)
jest.mock("Components/Publishing/ToolTip/TooltipsDataLoader", () => ({
  TooltipsData: props => props.children,
}))

describe("ArticleWithFullScreen", () => {
  let props
  const getWrapper = (passedProps = props) => {
    return mount(<ArticleWithFullScreen {...passedProps} />)
  }

  beforeEach(() => {
    props = {
      article: StandardArticle,
      display: Display("standard"),
      relatedArticlesForCanvas: RelatedCanvas,
      relatedArticlesForPanel: RelatedPanel,
    }
  })

  it("indexes and titles images", () => {
    const component = getWrapper().instance() as ArticleWithFullScreen
    expect(component.state.article.sections[4].images[0].setTitle).toBe(
      "A World Without Capitalism"
    )
    expect(component.state.article.sections[4].images[0].index).toBe(0)
    expect(component.state.article.sections[4].images[1].index).toBe(1)
    expect(component.state.article.sections[6].images[0].index).toBe(3)
    expect(component.state.article.sections[6].images[1].index).toBe(4)
  })

  it("renders articles in standard layout", () => {
    const component = getWrapper()
    expect(component.find(StandardLayout).length).toBe(1)
    expect(component.find(RelatedArticlesPanel).length).toBe(1)
    expect(component.find(RelatedArticlesCanvas).length).toBe(1)
  })

  it("renders articles in feature layout", () => {
    props.article = FeatureArticle
    const component = getWrapper()
    expect(component.find(FeatureLayout).length).toBe(1)
    expect(component.find(RelatedArticlesPanel).length).toBe(0)
    expect(component.find(RelatedArticlesCanvas).length).toBe(1)
  })

  it("renders children if props.customEditorial is provided", () => {
    props.customEditorial = "EOY_2018_CULTURE"
    props.article = Eoy2018CultureFixture
    const component = mount(
      <ArticleWithFullScreen {...props}>
        <EditorialFeature {...props} />
      </ArticleWithFullScreen>
    )
    expect(component.find(StandardLayout).length).toBe(0)
    expect(component.find(EditorialFeature).length).toBe(1)
    expect(component.find(Eoy2018Culture).length).toBe(1)
  })

  it("does not render children if props.customEditorial is not provided", () => {
    const component = mount(
      <ArticleWithFullScreen {...props}>
        <div>hello it's me</div>
      </ArticleWithFullScreen>
    )
    expect(component.find(StandardLayout).length).toBe(1)
    expect(component.find(RelatedArticlesPanel).length).toBe(1)
    expect(component.find(RelatedArticlesCanvas).length).toBe(1)
    expect(component.text()).not.toMatch("hello it's me")
  })
})
