import { mount } from "enzyme"
import "jest-styled-components"
import { clone } from "lodash"
import _ from "lodash"
import React from "react"
import renderer from "react-test-renderer"
import {
  FeatureArticle,
  SeriesArticleSponsored,
  SuperArticle,
} from "../../Fixtures/Articles"
import { HeroSections } from "../../Fixtures/Components"
import { EditableChild } from "../../Fixtures/Helpers"
import { VerticalOrSeriesTitle } from "../../Sections/VerticalOrSeriesTitle"
import { Header } from "../Header"

jest.mock("react-sizeme", () => jest.fn(c => d => d))

describe("feature", () => {
  it("renders feature text header properly", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[0],
    })
    const header = renderer.create(<Header article={article} />).toJSON()
    expect(header).toMatchSnapshot()
  })

  it("renders feature split header properly", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[1],
    })
    const header = renderer.create(<Header article={article} />).toJSON()
    expect(header).toMatchSnapshot()
  })

  it("renders feature full header properly", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[2],
    })
    const header = renderer.create(<Header article={article} />).toJSON()
    expect(header).toMatchSnapshot()
  })

  it("renders feature header with children properly", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[2],
    })
    const header = renderer
      .create(
        <Header
          article={article}
          editDeck={EditableChild("Deck")}
          editImage={EditableChild("Image")}
          editTitle={EditableChild("Title")}
          editVertical="Missing Vertical"
        />
      )
      .toJSON()
    expect(header).toMatchSnapshot()
  })

  it("renders feature full header without a deck properly", () => {
    const decklessHero = _.extend({}, HeroSections[2], { deck: null })
    const article = _.extend({}, FeatureArticle, { hero_section: decklessHero })
    const header = renderer.create(<Header article={article} />).toJSON()
    expect(header).toMatchSnapshot()
  })

  it("renders superArticle full header properly", () => {
    const article = _.extend({}, SuperArticle, {
      hero_section: HeroSections[2],
    })
    const header = renderer.create(<Header article={article} />).toJSON()
    expect(header).toMatchSnapshot()
  })

  it("renders a date passed as prop", () => {
    const header = mount(
      <Header article={FeatureArticle} date={"2017-05-19T13:09:18.567Z"} />
    )
    expect(header.html()).toContain("May 19, 2017 9:09 am")
  })

  it("renders an article in a series properly", () => {
    const FeatureSeriesArticle = clone({
      ...FeatureArticle,
      seriesArticle: SeriesArticleSponsored,
    })
    const header = mount(<Header article={FeatureSeriesArticle} />)
    expect(header.text()).toMatch(SeriesArticleSponsored.title)
    expect(header.find(VerticalOrSeriesTitle).length).toBe(1)
  })
})
