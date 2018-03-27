import moment from "moment"
import React from "react"
import styled from "styled-components"
import colors from "../../../Assets/Colors"
import { pMedia } from "../../Helpers"
import { Fonts } from "../Fonts"

interface Props {
  date: string
}

export const NewsNav: React.SFC<Props> = props => {
  const { date } = props
  const today = new Date()
  const isToday =
    moment(date).format("MMM D, YYYY") === moment(today).format("MMM D, YYYY")
  const hasYear = moment(date).format("YYYY") !== moment(today).format("YYYY")
  const format = hasYear ? "MMM D, YYYY" : "MMM D"

  return (
    <NewsNavContainer>
      <MaxWidthContainer>
        {date && (
          <NavText>{isToday ? "Today" : moment(date).format(format)}</NavText>
        )}
        <Title>The News</Title>
      </MaxWidthContainer>
    </NewsNavContainer>
  )
}

const NavText = styled.div`
  ${Fonts.unica("s25", "medium")};
  ${pMedia.sm`
    ${Fonts.unica("s16", "medium")}
  `};
`

const Title = NavText.extend`
  position: absolute;
  left: 30px;
  ${pMedia.sm`
    left: 20px;
  `};
`

const MaxWidthContainer = styled.div`
  position: relative;
  max-width: 780px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 26px;
  ${pMedia.sm`
    min-height: 16px;
  `};
`

const NewsNavContainer = styled.div`
  position: fixed;
  top: 52px;
  left: 0;
  right: 0;
  border-bottom: 1px solid ${colors.grayRegular};
  padding: 10px 0;
  background: white;
  z-index: 1;
`
