import React from "react"
import styled from "styled-components"
import { HeaderTextPrimary } from "./HeaderTextPrimary"
import { HeaderTextSub } from "./HeaderTextSub"

export interface HeaderTextProps {
  article?: any
  date?: string
  editDeck?: any
  editTitle?: any
  editVertical?: any
}

export const HeaderText: React.SFC<HeaderTextProps> = props => {
  return (
    <TextContainer>
      <HeaderTextPrimary {...props} />
      <HeaderTextSub {...props} />
    </TextContainer>
  )
}

export const TextContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`
