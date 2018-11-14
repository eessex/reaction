import { color, space } from "@artsy/palette"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { getEditorialHref } from "Components/Publishing/Constants"
import { get, omit } from "lodash"
import React from "react"
import styled from "styled-components"
import { Responsive } from "Utils/Responsive"
import { pMedia } from "../../Helpers"
import { ArticleProps } from "../Article"
import { DisplayPanel } from "../Display/DisplayPanel"
import { Header } from "../Header/Header"
import { ReadMoreButton } from "../ReadMore/ReadMoreButton"
import { ReadMoreWrapper } from "../ReadMore/ReadMoreWrapper"
import { Sections } from "../Sections/Sections"
import { CanvasFooter, CanvasFooterContainer } from "./Components/CanvasFooter"
import { Sidebar } from "./Components/Sidebar"

interface ArticleState {
  isTruncated: boolean
}

@track()
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
      isTruncated: props.isTruncated || false,
    }
  }

  @track<ArticleProps>(props => {
    // Track here and on ReadMoreButton so pageview & action both fire
    const {
      article: { layout, slug },
      infiniteScrollEntrySlug,
    } = props
    const referrer = infiniteScrollEntrySlug
      ? `/article/${infiniteScrollEntrySlug}`
      : undefined

    return {
      action_type: Schema.ActionType.Click,
      context_module: Schema.ContextModule.ReadMore,
      destination_path: getEditorialHref(layout, slug),
      subject: Schema.Subject.ReadMore,
      referrer,
    }
  })
  removeTruncation() {
    this.setState({ isTruncated: false })
  }

  render() {
    const {
      article,
      display,
      emailSignupUrl,
      infiniteScrollEntrySlug,
      isMobile,
      relatedArticlesForCanvas,
      relatedArticlesForPanel,
      renderTime,
      showTooltips,
    } = this.props
    const { isTruncated } = this.state
    const campaign = omit(display, "panel", "canvas")

    return (
      <Responsive>
        {({ xs, sm, md }) => {
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
            <ArticleWrapper isInfiniteScroll={this.props.isTruncated}>
              <ReadMoreWrapper
                isTruncated={isTruncated}
                hideButton={() => this.setState({ isTruncated: false })}
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
              </ReadMoreWrapper>

              {isTruncated && (
                <ReadMoreButton
                  onClick={this.removeTruncation.bind(this)}
                  referrer={`/article/${infiniteScrollEntrySlug}`}
                />
              )}

              {(relatedArticlesForCanvas || display) && (
                <CanvasFooter
                  article={article}
                  display={display}
                  relatedArticles={relatedArticlesForCanvas}
                  renderTime={renderTime}
                />
              )}
            </ArticleWrapper>
          )
        }}
      </Responsive>
    )
  }
}

export const StandardLayoutParent = styled.div`
  margin: 0 40px 100px 40px;
  ${pMedia.sm`
    margin: 0 0 100px 0;
  `};

  @media print {
    margin-bottom: 0;
  }
`

const ArticleWrapper = styled.div.attrs<{ isInfiniteScroll?: boolean }>({})`
  ${props =>
    props.isInfiniteScroll &&
    `
    padding-top: ${space(4)}px;
    border-top: 1px solid ${color("black10")};
  `};

  @media print {
    ${CanvasFooterContainer} {
      display: none;
    }
  }
`

const StandardLayoutContainer = styled.div`
  max-width: 1250px;
  display: flex;
  margin: auto;
  justify-content: space-between;
`
