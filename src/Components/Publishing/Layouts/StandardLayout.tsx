import Colors from "Assets/Colors"
import { get, omit } from "lodash"
import React from "react"
import styled from "styled-components"
import { ResponsiveDeprecated } from "../../../Utils/ResponsiveDeprecated"
import { pMedia } from "../../Helpers"
import { ArticleProps } from "../Article"
import { DisplayCanvas } from "../Display/Canvas"
import { DisplayPanel } from "../Display/DisplayPanel"
import { Header } from "../Header/Header"
import ReadMore from "../ReadMore/ReadMoreButton"
import { ReadMoreWrapper } from "../ReadMore/ReadMoreWrapper"
import RelatedArticlesCanvas from "../RelatedArticles/RelatedArticlesCanvas"
import { Sections } from "../Sections/Sections"
import { Sidebar } from "./Components/Sidebar"

interface ArticleState {
  isTruncated: boolean
  isInfinite: boolean
}

export class StandardLayout extends React.Component<
  ArticleProps,
  ArticleState
> {
  static defaultProps = {
    isMobile: false,
    isSuper: false,
    article: {},
    isTruncated: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      isTruncated: props.isTruncated,
      isInfinite: props.isTruncated,
    }
  }

  removeTruncation = () => {
    this.setState({ isTruncated: false })
  }

  render() {
    const {
      article,
      display,
      emailSignupUrl,
      relatedArticlesForCanvas,
      relatedArticlesForPanel,
      renderTime,
      showTooltips,
    } = this.props
    const { isTruncated, isInfinite } = this.state

    const campaign = omit(display, "panel", "canvas")
    const displayOverflows = display
      ? display.canvas.layout === "slideshow"
      : false

    return (
      // FIXME: Update with new version
      <ResponsiveDeprecated initialState={{ isMobile: this.props.isMobile }}>
        {({ isMobile, xs, sm, md }) => {
          const hasPanel = get(display, "panel", false)
          const isMobileAd = Boolean(isMobile || xs || sm || md)

          const DisplayPanelAd = () => {
            return (
              hasPanel && (
                <DisplayPanel
                  isMobile={isMobileAd}
                  unit={display.panel}
                  campaign={campaign}
                  article={article}
                  renderTime={renderTime}
                />
              )
            )
          }
          return (
            <ArticleContainer isInfinite={isInfinite}>
              <ReadMoreWrapper
                isTruncated={isTruncated}
                hideButton={this.removeTruncation}
              >
                <Header article={article} />

                <StandardLayoutParent>
                  <StandardLayoutContainer>
                    <Sections
                      DisplayPanel={DisplayPanelAd}
                      article={article}
                      isMobile={isMobile}
                      showTooltips={showTooltips}
                    />
                    <Sidebar
                      emailSignupUrl={emailSignupUrl}
                      DisplayPanel={DisplayPanelAd}
                      relatedArticlesForPanel={relatedArticlesForPanel}
                    />
                  </StandardLayoutContainer>
                </StandardLayoutParent>

                {relatedArticlesForCanvas && (
                  <RelatedContainer>
                    <Break />
                    <RelatedArticlesCanvas
                      articles={relatedArticlesForCanvas}
                      isMobile={isMobile}
                      vertical={article.vertical}
                    />
                  </RelatedContainer>
                )}
              </ReadMoreWrapper>

              {/*
                Read More Button
              */}
              {isTruncated && <ReadMore onClick={this.removeTruncation} />}

              {/*
                Footer
              */}
              {display && (
                <div>
                  {relatedArticlesForCanvas && <Break />}
                  <DisplayContainer hasMargin={!displayOverflows}>
                    <DisplayCanvas
                      unit={display.canvas}
                      campaign={campaign}
                      article={article}
                      renderTime={renderTime}
                    />
                  </DisplayContainer>
                </div>
              )}
            </ArticleContainer>
          )
        }}
      </ResponsiveDeprecated>
    )
  }
}

export const ArticleContainer = styled.div.attrs<{ isInfinite?: boolean }>({})`
  ${props =>
    props.isInfinite &&
    `
    border-top: 1px solid ${Colors.grayRegular};
    padding-top: 80px;
  `};
`

export const StandardLayoutParent = styled.div`
  margin: 0 40px 100px 40px;
  ${pMedia.sm`
    margin: 0 0 100px 0;
  `};
`

const StandardLayoutContainer = styled.div`
  max-width: 1250px;
  display: flex;
  margin: auto;
  justify-content: space-between;
`

const Break = styled.div`
  border-top: 1px solid ${Colors.grayRegular};
  width: 100%;
`

export const RelatedContainer = styled.div`
  margin: 80px 0 0;
`

const DisplayContainer = styled.div.attrs<{
  hasMargin?: boolean
}>({})`
  padding: ${props => (props.hasMargin ? "0 40px" : "0")};
  ${pMedia.sm`
    padding: 0 20px;
  `};
`
