import React from "react"
import track, { TrackingProp } from "react-tracking"
import Events from "../../Utils/Events"

import { Theme, themeProps } from "@artsy/palette"
import { GridThemeProvider } from "styled-bootstrap-grid"
import { MediaContextProvider } from "Utils/Responsive"
import { BannerWrapper } from "./Banner/Banner"
import { PixelTracker } from "./Display/ExternalTrackers"
import ArticleWithFullScreen from "./Layouts/ArticleWithFullScreen"
import { ClassicLayout } from "./Layouts/ClassicLayout"
import { NewsLayout } from "./Layouts/NewsLayout"
import { SeriesLayout } from "./Layouts/SeriesLayout"
import { VideoLayout } from "./Layouts/VideoLayout"
import { FullScreenProvider } from "./Sections/FullscreenViewer/FullScreenProvider"
import { ArticleData, DisplayData } from "./Typings"

export interface ArticleProps {
  article: ArticleData
  backgroundColor?: string
  customEditorial?: string
  color?: string
  relatedArticles?: any
  relatedArticlesForPanel?: any
  relatedArticlesForCanvas?: any
  renderTime?: number
  seriesArticle?: ArticleData
  isHovered?: boolean
  isLoggedIn?: boolean
  isMobile?: boolean
  isTablet?: boolean
  infiniteScrollEntrySlug?: string
  isSuper?: boolean
  isTruncated?: boolean
  emailSignupUrl?: string
  headerHeight?: string
  marginTop?: string | null
  display?: DisplayData
  showTooltips?: boolean
  slideIndex?: number
  tracking?: TrackingProp
  closeViewer?: () => void
  viewerIsOpen?: boolean
  onOpenAuthModal?: (type: "register" | "login", config: object) => void
  onExpand?: () => void
}

@track(
  (props: ArticleProps) => {
    return {
      page: "Article",
      entity_type: "article",
      entity_id: props.article.id,
    }
  },
  {
    dispatch: data => Events.postEvent(data),
  }
)
export class Article extends React.Component<ArticleProps> {
  getArticleLayout = () => {
    const { article } = this.props

    switch (article.layout) {
      case "classic": {
        return <ClassicLayout {...this.props} />
      }
      case "series": {
        return <SeriesLayout {...this.props} />
      }
      case "video": {
        return <VideoLayout {...this.props} />
      }
      case "news": {
        return <NewsLayout {...this.props} />
      }
      default: {
        return <ArticleWithFullScreen {...this.props} />
      }
    }
  }

  shouldRenderSignUpCta = () => {
    const { article, isLoggedIn, isTruncated, isMobile } = this.props

    return (
      isMobile && article.layout !== "series" && !isLoggedIn && !isTruncated
    )
  }

  sponsorPixelTrackingCode = article => {
    if (article.sponsor && article.sponsor.pixel_tracking_code) {
      return article.sponsor
    } else if (
      article.seriesArticle &&
      article.seriesArticle.sponsor &&
      article.seriesArticle.sponsor.pixel_tracking_code
    ) {
      return article.seriesArticle.sponsor
    }
  }

  render() {
    const { article } = this.props
    const trackingCode = this.sponsorPixelTrackingCode(article)

    return (
      <MediaContextProvider>
        <Theme>
          <GridThemeProvider gridTheme={themeProps.grid}>
            <FullScreenProvider>
              {this.getArticleLayout()}
              {trackingCode && (
                <PixelTracker
                  unit={trackingCode}
                  date={this.props.renderTime}
                />
              )}
              {this.shouldRenderSignUpCta() && (
                <BannerWrapper article={article} />
              )}
            </FullScreenProvider>
          </GridThemeProvider>
        </Theme>
      </MediaContextProvider>
    )
  }
}
