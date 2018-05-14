import styled from "styled-components"
import React from "react"
import { garamond } from "Assets/Fonts"
import Markdown from "react-markdown"
import { Truncator } from "../../Sections/Truncator"

interface Props {
  text: string
}

export const ToolTipDescription: React.SFC<Props> = props => {
  const { text } = props

  return (
    <Description>
      <Truncator maxLineCount={3}>
        <Markdown
          source={text}
          containerTagName="span"
          disallowedTypes={["Link"]}
        />
      </Truncator>
    </Description>
  )
}

const Description = styled.div`
  ${garamond("s15")};
  p {
    margin: 0;
  }
  margin: 10px 0;
`
