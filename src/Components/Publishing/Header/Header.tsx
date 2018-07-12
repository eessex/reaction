import React from "react"
import { ClassicHeader } from "./ClassicHeader"
import { FeatureHeader } from "./FeatureHeader"
import { StandardHeader } from "./StandardHeader"

interface HeaderProps {
  article: any
  date?: string
  editDeck?: any
  editLeadParagraph?: any
  editImage?: any
  editTitle?: any
  editVertical?: string
}

export const Header: React.SFC<HeaderProps> = props => {
  const {
    article,
    date,
    editDeck,
    editImage,
    editLeadParagraph,
    editTitle,
    editVertical,
  } = props

  switch (article.layout) {
    case "feature": {
      return (
        <FeatureHeader
          article={article}
          date={date && date}
          editDeck={editDeck}
          editImage={editImage}
          editTitle={editTitle}
          editVertical={editVertical}
        />
      )
    }
    case "standard": {
      return (
        <StandardHeader
          article={article}
          date={date && date}
          editTitle={editTitle}
          editVertical={editVertical}
        />
      )
    }
    default: {
      return (
        <ClassicHeader
          article={article}
          date={date && date}
          editLeadParagraph={editLeadParagraph}
          editTitle={editTitle}
        />
      )
    }
  }
}
