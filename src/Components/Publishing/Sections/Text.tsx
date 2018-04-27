import React, { Component } from "react"
import { ArticleLayout } from "../Typings"
import { StyledText } from "./StyledText"

import url from "url"
import { compact, last } from "lodash"
import cheerio from "cheerio"

interface Props extends React.HTMLProps<HTMLDivElement> {
  color?: string
  html?: string
  isContentEnd?: boolean
  isContentStart?: boolean
  layout: ArticleLayout
  postscript?: boolean
}

interface State {
  html: string
  hasToolTips: boolean
}

export class Text extends Component<Props, State> {
  static defaultProps = {
    color: "black",
  }

  state = {
    html: this.props.html || "",
    hasToolTips: false,
  }

  parseHtml = () => {
    const artists = this.getArtsySlugsFromHTML("artist")
    const genes = this.getArtsySlugsFromHTML("gene")

    if (artists.length || genes.length) {
      // this.insertToolTipPlaceholders()
      this.setState({ hasToolTips: true })
    }
  }

  getArtsySlugsFromHTML = model => {
    const { html } = this.state
    const $ = cheerio.load(html)

    const slugs = compact($("a")).map(a => {
      let href = $(a).attr("href")
      if (href) {
        if (href.match(`artsy.net/${model}`)) {
          return last(url.parse(href).pathname.split("/"))
        } else {
          return null
        }
      } else {
        return null
      }
    })
    return compact(slugs)
  }

  replaceLinkWPlaceholder = (model, id, text) => {
    return `<a id="tooltip" data-type="${model}" data-entity="${id}">${text}</a>`
  }

  getModel = href => {
    if (href.match("artsy.net/artist/")) {
      return "artist"
    }
    if (href.match("artsy.net/gene/")) {
      return "gene"
    }
  }

  insertToolTipPlaceholders = html => {
    const newHtml = `<div>${html}</div>`
    const $ = cheerio.load(newHtml)

    $("div")
      .children()
      .map((i, element) => {
        if (element.children) {
          element.children.map(child => {
            let href = $(child).attr("href")
            if (href) {
              const model = this.getModel(href)
              const text = $(child).text()
              const id = last(url.parse(href).pathname.split("/"))
              if (model) {
                const replace = this.replaceLinkWPlaceholder(model, id, text)
                $(child).replaceWith(replace)
              }
            }
          })
        }
      })
    return $("div").html()
  }

  componentDidMount() {
    const htmlMaybeWithContentEnd = this.htmlMaybeWithContentEnd()
    const html = this.insertToolTipPlaceholders(htmlMaybeWithContentEnd)

    this.setState({ html })
  }

  htmlMaybeWithContentEnd = () => {
    const { html } = this.state
    const { isContentEnd } = this.props
    // Remove existing spans - TODO: Backfill out of articles
    const cleanedHtml = html.replace("<span class='content-end'> </span>", "")

    if (isContentEnd) {
      const doc = document.createElement("div")
      doc.innerHTML = cleanedHtml

      const paragraphs = doc.getElementsByTagName("P")
      const lastParagraph =
        paragraphs.length && paragraphs[paragraphs.length - 1]
      if (lastParagraph) {
        // insert content-end in last paragraph
        lastParagraph.innerHTML =
          lastParagraph.innerHTML + "<span class='content-end'> </span>"
      }
      return doc.innerHTML
    }
    return cleanedHtml
  }

  render() {
    const { children, color, isContentStart, layout, postscript } = this.props
    const { hasToolTips, html } = this.state

    return (
      <StyledText
        className="article__text-section"
        color={color}
        isContentStart={isContentStart}
        layout={layout}
        postscript={postscript}
      >
        {html.length ? (
          hasToolTips ? (
            <div>Gimme</div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: html }} />
          )
        ) : (
          children
        )}
      </StyledText>
    )
  }
}
