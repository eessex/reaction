import React, { Component } from "react"
import { Col, Row } from "react-styled-flexboxgrid"
import styled from "styled-components"
import colors from "../../../Assets/Colors"
import { pMedia } from "../../Helpers"
import { NewsHeadline } from "../News/NewsHeadline"
import { NewsSections } from "../News/NewsSections"
import { ArticleData } from "../Typings"

interface Props {
  article: ArticleData
  isMobile?: boolean
  isTruncated?: boolean
  onExpand?: any
  marginTop?: string
}

interface State {
  isTruncated: boolean
}

interface NewsContainerProps {
  isTruncated: boolean
  marginTop: string
}

export class NewsLayout extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isTruncated: this.props.isTruncated,
    }
  }

  onClick = () => {
    const { onExpand } = this.props

    this.setState({ isTruncated: false })

    if (onExpand) {
      onExpand()
    }
  }

  render() {
    const { article, marginTop } = this.props
    const { isTruncated } = this.state

    return (
      <NewsContainer
        onClick={this.onClick}
        isTruncated={isTruncated}
        marginTop={marginTop}
      >
        <NewsHeadline article={article} />
        <NewsSections {...this.props} isTruncated={isTruncated} />
      </NewsContainer>
    )
  }
}

const NewsContainer = styled.div`
  position: relative;
  max-width: 780px;
  padding: 20px 30px 30px;
  margin: 40px auto;
  transition: all 0.5s ease;
  border: 1px solid white;
  border-radius: 4px;
  ${Col} {
    padding-left: 0;
    padding-right: 0;
  }
  ${Row} {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  ${(props: NewsContainerProps) =>
    props.isTruncated &&
    `
    &:hover {
      border-color: ${colors.grayRegular};
    }
  `};
  ${(props: NewsContainerProps) =>
    props.marginTop &&
    `
      margin-top: ${props.marginTop}
    `};

  ${pMedia.sm`
      padding: 20px 15px;
      max-width: calc(100% - 10px);
  `};
`
