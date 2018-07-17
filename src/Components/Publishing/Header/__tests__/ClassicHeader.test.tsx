import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import { ClassicByline } from "../../Byline/ClassicByline"
import { ClassicArticle, StandardArticle } from "../../Fixtures/Articles"
import { Header } from "../Header"

describe("Classic Header", () => {
  it("renders classic header properly", () => {
    const header = renderer.create(<Header article={ClassicArticle} />).toJSON()
    expect(header).toMatchSnapshot()
  })

  it("renders classic header with children properly", () => {
    const header = renderer
      .create(
        <Header article={StandardArticle}>
          <div>Child 0: Title</div>
          <div>Child 1: Lead Paragraph</div>
        </Header>
      )
      .toJSON()
    expect(header).toMatchSnapshot()
  })
})

describe("ClassicByline", () => {
  it("renders a single author", () => {
    const author = "Life at Artsy"
    const authors = [{ name: "Molly Gottschalk" }]
    const byline = renderer.create(
      <ClassicByline
        author={author}
        authors={authors}
        date={"2017-05-19T13:09:18.567Z"}
      />
    )
    expect(byline).toMatchSnapshot()
  })

  it("renders multiple authors", () => {
    const author = "Life at Artsy"
    const authors = [{ name: "Molly Gottschalk" }, { name: "Kana Abe" }]
    const byline = renderer.create(
      <ClassicByline
        author={author}
        authors={authors}
        date={"2017-05-19T13:09:18.567Z"}
      />
    )
    expect(byline).toMatchSnapshot()
  })
})
