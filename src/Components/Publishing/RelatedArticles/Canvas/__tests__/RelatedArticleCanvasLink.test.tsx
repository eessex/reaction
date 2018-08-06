import { mount } from "enzyme"
import "jest-styled-components"
import React from "react"
import { mockTracking } from "../../../../../Analytics"
import { RelatedCanvas } from "../../../Fixtures/Components"
import { RelatedArticleCanvasLink } from "../RelatedArticleCanvasLink"

jest.unmock("react-tracking")

describe("RelatedArticleCanvasLink", () => {
  const getWrapper = props => {
    return mount(<RelatedArticleCanvasLink {...props} />)
  }

  let props
  beforeEach(() => {
    props = {
      article: RelatedCanvas[0],
    }
  })

  it("renders expected data", () => {
    const component = getWrapper(props)

    expect(component.text()).toMatch(
      "The 15 Top Art Schools in the United States"
    )
    expect(component.text()).toMatch("Anna Louis-Sussman and Kana Abe")
    expect(component.text()).toMatch("May 19, 2017")
    expect(component.html()).toMatch("PoetterHall_Exterior%2Bcopy.jpg")
  })

  it("Tracks link clicks", () => {
    const { Component, dispatch } = mockTracking(RelatedArticleCanvasLink)
    const component = mount(<Component article={RelatedCanvas[0]} />)
    component.simulate("click")

    expect(dispatch).toBeCalledWith({
      action_type: "Click",
      destination_path:
        "/article/artsy-editorial-15-top-art-schools-united-states",
      type: "thumbnail",
    })
  })
})
