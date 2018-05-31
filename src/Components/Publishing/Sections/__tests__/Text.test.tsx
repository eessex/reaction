import { mount } from "enzyme"
import "jest-styled-components"
import PropTypes from "prop-types"
import React from "react"
import renderer from "react-test-renderer"
import {
  NewsArticle,
  TextClassicArticle,
  TextFeatureArticle,
  TextStandardArticle,
} from "../../Fixtures/Articles"
import { ContextProvider } from "../../../Artsy"
import { TextFromArticle } from "../../Fixtures/Helpers"
import { Text } from "../Text"
import { LinkWithTooltip } from "../../ToolTip/LinkWithTooltip"
import { wrapperWithContext } from "../../Fixtures/Helpers"

describe("Text", () => {
  const getWrapper = props => {
    return wrapperWithContext(
      {
        tooltipsData: {
          artists: [props.artist],
        },
      },
      {
        tooltipsData: PropTypes.object,
      },
      <ContextProvider>
        <Text {...props} />
      </ContextProvider>
    )
  }

  let props
  beforeEach(() => {
    props = {}
  })

  describe("Snapshots", () => {
    it("renders classic text properly", () => {
      props.html = TextFromArticle(TextClassicArticle)
      props.layout = "classic"

      const text = renderer.create(getWrapper(props)).toJSON()
      expect(text).toMatchSnapshot()
    })

    it("renders feature text properly", () => {
      props.html = TextFromArticle(TextFeatureArticle)
      props.layout = "feature"
      const text = renderer.create(getWrapper(props)).toJSON()
      expect(text).toMatchSnapshot()
    })

    it("renders standard text properly", () => {
      props.html = TextFromArticle(TextStandardArticle)
      props.layout = "standard"
      const text = renderer.create(getWrapper(props)).toJSON()
      expect(text).toMatchSnapshot()
    })

    it("renders news text properly", () => {
      props.html = TextFromArticle(NewsArticle)
      props.layout = "news"
      const text = renderer.create(getWrapper(props)).toJSON()
      expect(text).toMatchSnapshot()
    })
  })

  describe("Unit", () => {
    it("Inserts content-end spans if isContentEnd", () => {
      props.html = TextFromArticle(TextFeatureArticle)
      props.layout = "feature"
      props.isContentEnd = true
      const wrapper = mount(getWrapper(props))

      expect(wrapper.html()).toMatch("content-end")
    })

    it("Inserts content-end spans in last paragraph, even if another block follows", () => {
      props.html = "<p>The end of the article</p><h3>An h3 after</h3>"
      props.layout = "standard"
      props.isContentEnd = true
      const wrapper = mount(getWrapper(props))

      expect(wrapper.html()).toMatch(
        `<p>The end of the article<span class=\"content-end\"> </span></p><h3>An h3 after</h3>`
      )
    })

    it("Removes content-end spans if not isContentEnd", () => {
      props.html =
        "<p>The end of a great article. <span class='content-end> </span></p>"
      props.layout = "feature"
      const wrapper = mount(getWrapper(props))

      expect(wrapper.html()).not.toMatch("content-end")
    })

    it("Should add LinkWithTooltip when artsy link is contained", () => {
      props.html = `<p>Amazing content <a href="https://www.artsy.net/artist/banksy">Banksy</a></p>`
      props.layout = "standard"
      props.showTooltips = true
      const wrapper = mount(getWrapper(props))

      expect(wrapper.find(LinkWithTooltip)).toHaveLength(1)
    })

    it("Does not render for empty links", () => {
      props.html = `<p>Amazing content <a href="https://www.artsy.net/artist/banksy"></a></p>`
      props.layout = "standard"
      props.showTooltips = true
      const wrapper = mount(getWrapper(props))

      expect(wrapper.find(LinkWithTooltip)).toHaveLength(0)
    })
  })
})
