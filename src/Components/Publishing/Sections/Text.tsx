import React, { Component } from "react"
import { ArticleLayout } from "../Typings"
import { StyledText } from "./StyledText"
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser"
import LinkWithTooltip from "../ToolTip/LinkWithTooltip"
import { startsWith } from "lodash"

interface Props extends React.HTMLProps<HTMLDivElement> {
  color?: string
  html?: string
  isContentEnd?: boolean
  isContentStart?: boolean
  layout: ArticleLayout
  postscript?: boolean
  showTooltips?: boolean
  showToolTipMarketData?: boolean
}

interface State {
  html: string
}

export class Text extends Component<Props, State> {
  static defaultProps = {
    color: "black",
    showToolTip: false,
    showToolTipMarketData: false,
  }

  state = {
    html: this.props.html || "",
  }

  componentDidMount() {
    const html = this.htmlMaybeWithContentEnd()

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

  shouldShowTooltipForURL = node => {
    const urlBase = "https://www.artsy.net/"
    const types = ["artist/", "gene/"]

    for (const type of types) {
      if (startsWith(node.attribs.href, urlBase + type)) {
        return true
      }
    }

    return false
  }

  transformNode = (node, index) => {
    if (node.name === "p") {
      node.name = "div"
      node.attribs.class = "paragraph"
      return convertNodeToElement(node, index, this.transformNode)
    }

    if (node.name === "a" && this.shouldShowTooltipForURL(node)) {
      const href = node.attribs.href
      const text = node.children[0] && node.children[0].data
      const { showToolTipMarketData } = this.props

      if (text) {
        return (
          <LinkWithTooltip
            key={href + index}
            url={href}
            showMarketData={showToolTipMarketData}
          >
            {text}
          </LinkWithTooltip>
        )
      }
    }
  }

  render() {
    const {
      children,
      color,
      isContentStart,
      layout,
      postscript,
      showTooltips,
    } = this.props
    const { html } = this.state

    return (
      <StyledText
        className="article__text-section"
        color={color}
        isContentStart={isContentStart}
        layout={layout}
        postscript={postscript}
        showTooltips={showTooltips}
      >
        {html.length ? (
          showTooltips ? (
            <div>
              {ReactHtmlParser(html, { transform: this.transformNode })}
            </div>
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
