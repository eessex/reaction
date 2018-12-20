import { Flex, Sans, Serif } from "@artsy/palette"
import { unica } from "Assets/Fonts"
import { pMedia } from "Components/Helpers"
import { Byline } from "Components/Publishing/Byline/Byline"
import { Date } from "Components/Publishing/Byline/Date"
import { formatTime, getMediaDate } from "Components/Publishing/Constants"
import { IconVideoPlay } from "Components/Publishing/Icon/IconVideoPlay"
import React, { Component } from "react"
import track, { TrackingProp } from "react-tracking"
import styled from "styled-components"
import { crop } from "Utils/resizer"

interface Props {
  article?: any
  color?: string
  editing?: boolean
  editDate?: any
  editDescription?: any
  editTitle?: any
  editImage?: any
  series?: any
  tracking?: TrackingProp
}

interface LinkProps extends Props, React.HTMLProps<HTMLLinkElement> {
  published: boolean
}

@track()
export class ArticleCard extends Component<Props, null> {
  public static defaultProps: Partial<Props>

  isUnpublishedMedia() {
    const { media, layout } = this.props.article
    return layout === "video" && media && !media.published
  }

  isEditing = () => {
    const {
      editDate,
      editDescription,
      editImage,
      editTitle,
      editing,
    } = this.props

    return editing || editDate || editDescription || editImage || editTitle
  }

  renderDate = () => {
    const { article, color, editDate } = this.props
    const { media } = article

    if (editDate) {
      return (
        <MediaDate size="3t" weight="medium">
          {editDate}
        </MediaDate>
      )
    } else if (media) {
      return this.renderMediaDate()
    } else {
      return (
        <Byline article={article} color={color} size="3t" layout="condensed" />
      )
    }
  }

  renderMediaDate = () => {
    const { article } = this.props
    const mediaDate = getMediaDate(article)
    const date = article.layout === "video" ? mediaDate : article.published_at

    if (this.isUnpublishedMedia()) {
      return (
        <MediaDate size="3t" weight="medium">
          <span>Available </span>
          <Date format="monthYear" date={mediaDate} />
        </MediaDate>
      )
    } else {
      return <Date layout="condensed" size="3t" date={date} />
    }
  }

  renderMediaCoverInfo = () => {
    const { article, color } = this.props

    if (this.isUnpublishedMedia()) {
      return <MediaComingSoon>Coming Soon</MediaComingSoon>
    } else {
      return (
        <MediaPlay>
          <IconVideoPlay color={color} />
          <Sans size="3t" weight="medium">
            {formatTime(article.media.duration)}
          </Sans>
        </MediaPlay>
      )
    }
  }

  openLink = e => {
    e.preventDefault()

    if (!this.isUnpublishedMedia() && !this.isEditing()) {
      window.open(e.currentTarget.attributes.href.value)
    }

    this.props.tracking.trackEvent({
      action: "Click",
      label: "Related article card",
    })
  }

  render() {
    const {
      article,
      color,
      editDescription,
      editImage,
      editTitle,
      series,
    } = this.props
    const { layout, media } = article
    const isUnpublishedMedia = this.isUnpublishedMedia()

    const description = editDescription ? editDescription : article.description

    const title = editTitle
      ? editTitle
      : article.thumbnail_title || article.title

    return (
      <ArticleCardContainer
        href={isUnpublishedMedia ? "" : article.slug}
        color={color}
        className="ArticleCard"
        published={!isUnpublishedMedia}
        onClick={this.openLink}
      >
        <Flex
          width={["100%", "100%", "100%", "50%"]}
          mb={[0, 0, 0, "5px"]}
          flexDirection="column"
          justifyContent="space-between"
        >
          <div>
            {series && (
              <Sans size="3t" weight="medium" mb={1}>
                {series.title}
              </Sans>
            )}
            <Title>{title}</Title>

            <Serif size={["4", "4", "4", "5"]} mb={[2, 2, 2, 0]}>
              {description}
            </Serif>
          </div>
          {this.renderDate()}
        </Flex>

        <ImageContainer>
          {editImage ? (
            editImage
          ) : (
            <Image
              src={crop(article.thumbnail_image, { width: 680, height: 450 })}
            />
          )}
          {media && layout === "video" && this.renderMediaCoverInfo()}
        </ImageContainer>
      </ArticleCardContainer>
    )
  }
}

ArticleCard.defaultProps = {
  color: "black",
}

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: opacity 0.15s;
  display: block;
`

const ImageContainer = styled.div`
  position: relative;
  width: 50%;
  height: inherit;
  margin-left: 30px;
  ${pMedia.md`
    width: 100%;
    margin-left: 0;
    margin-bottom: 10px;
  `};
`

export const ArticleCardContainer = styled.a<LinkProps>`
  border: 1px solid;
  border-radius: 2px;
  color: ${props => props.color};
  cursor: ${props => (props.published ? "pointer" : "default")};
  text-decoration: none;
  padding: 30px;
  display: flex;

  ${Image} {
    opacity: ${props => (props.published ? "1" : "0.7")};
  }

  &:hover {
    ${Image} {
      opacity: 0.7;
    }
  }

  ${ImageContainer} {
    background: ${(props: LinkProps) =>
      props.color === "white" ? "black" : "white"};
  }
  ${pMedia.md`
    flex-direction: column-reverse;
    padding: 20px;
  `};
`

const Title = styled.div`
  ${unica("s45")};
  margin-bottom: 30px;
  ${pMedia.md`
    ${unica("s32")}
  `};
`

const MediaDate = styled(Sans)`
  display: flex;
  align-items: flex-end;

  span {
    margin-right: 5px;
  }
`

const Media = styled.div`
  position: absolute;
  left: 20px;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

const MediaPlay = styled(Media)`
  svg {
    width: 40px;
  }
  ${pMedia.md`
    svg {
      width: 30px;
    }
  `};
`

const MediaComingSoon = styled(Media)`
  ${unica("s45")};
  ${pMedia.md`
    ${unica("s32")}
  `};
`
