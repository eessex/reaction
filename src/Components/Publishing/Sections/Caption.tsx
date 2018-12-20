import { color } from "@artsy/palette"
import { garamond, unica } from "Assets/Fonts"
import React from "react"
import styled from "styled-components"
import { pMedia } from "../../Helpers"
import { ArticleLayout, SectionLayout } from "../Typings"

interface CaptionProps {
  caption: string
  color?: string
  index?: any
  layout?: ArticleLayout
  sectionLayout?: SectionLayout
}

interface FigcaptionProps {
  color?: string
  layout: ArticleLayout
  sectionLayout?: SectionLayout
}

export const Caption: React.SFC<CaptionProps> = props => {
  const { caption, children, layout, sectionLayout } = props

  const child = children || (
    <div dangerouslySetInnerHTML={{ __html: caption }} />
  )

  return (
    <CaptionContainer>
      <Figcaption
        layout={layout}
        sectionLayout={sectionLayout}
        color={props.color}
      >
        {child}
      </Figcaption>
    </CaptionContainer>
  )
}

export const CaptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 10px 0;
  ${pMedia.xs`
    padding: 0px 10px;
  `};
`

// includes draft placeholder class for editable text in Writer
const Figcaption = styled.div<FigcaptionProps>`
  padding: ${props => (props.sectionLayout === "fillwidth" ? "0 10px;" : "0;")}
  width: 100%;
  word-break: break-word;

  & > p, p,
  .public-DraftEditorPlaceholder-root,
  .public-DraftStyleDefault-block {
    ${props => (props.layout === "classic" ? garamond("s15") : unica("s14"))}
    color: ${props => (props.color ? props.color : color("black60"))};
    margin: 0;
  }

  & > a, a {
    color: ${props => (props.color ? props.color : color("black60"))};
    &:hover {
      color: ${props => (props.color ? props.color : color("black100"))};
    }
  }

  ${pMedia.xs`
    padding: 0px;
  `}
`
