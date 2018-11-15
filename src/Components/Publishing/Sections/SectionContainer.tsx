import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { ArticleLayout, SectionData } from "../Typings"

const BlockquoteWidth = "900px"
const ColumnWidth = "680px"
const ColumnWidthClassic = "580px"
const Fillwidth = "100%"
const OverflowWidth = "780px"
const OverflowWidthClassic = "1100px"

export const SectionContainer = styled.div.attrs<{
  section?: SectionData
  articleLayout?: ArticleLayout
}>({})`
  box-sizing: border-box;
  margin: auto;
  margin-bottom: 40px;
  max-width: ${props => getSectionWidth(props.section, props.articleLayout)};
  position: relative;

  ${props => pMedia.xl`
    ${props.articleLayout === "standard" &&
      `
      width: ${ColumnWidth};
    `}
  `};

  ${props => pMedia.md`
    padding: ${getSectionMobilePadding(props.section)};
  `};

  @media print {
    width: 100%;
    padding: 0;
  }
`

export const getSectionWidth = (
  section?: SectionData,
  articleLayout?: ArticleLayout
) => {
  const layout = (section && section.layout) || "column_width"
  const maybeOverflow =
    layout === "overflow_fillwidth" ? OverflowWidth : ColumnWidth
  const isText = section && section.type === "text"
  const isBlockquote = isText && section.body.includes("<blockquote>")

  switch (articleLayout) {
    case "standard": {
      if (isBlockquote) {
        return OverflowWidth
      } else {
        return maybeOverflow
      }
    }
    case "feature": {
      if (isBlockquote) {
        return BlockquoteWidth
      } else if (layout === "fillwidth") {
        return Fillwidth
      } else {
        return maybeOverflow
      }
    }
    case "classic": {
      return layout === "overflow_fillwidth"
        ? OverflowWidthClassic
        : ColumnWidthClassic
    }
    default:
      return ColumnWidth
  }
}

export const getSectionMobilePadding = (section?: SectionData) => {
  const type = section && section.type
  const isFillWidth = ["video", "image_collection", "image_set"].includes(type)
  const isMiniImageSet = type === "image_set" && section.layout === "mini"

  return !isFillWidth || isMiniImageSet ? "0 20px" : 0
}
