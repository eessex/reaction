import React from "react"
import BasicHeader from "./Feature/BasicHeader"
import { FullscreenHeader } from "./Feature/FullscreenHeader"
import { TextHeader } from "./Feature/TextHeader"

export interface FeatureHeaderProps {
  article?: any
  date?: string
  editDeck?: any
  editImage?: any
  editTitle?: any
  editVertical?: any
}

export const FeatureHeader: React.SFC<FeatureHeaderProps> = props => {
  const {
    article: { hero_section },
  } = props
  const type = hero_section && hero_section.type

  switch (type) {
    case "basic": {
      return <BasicHeader {...props} />
    }
    case "fullscreen": {
      return <FullscreenHeader {...props} />
    }
    default: {
      return <TextHeader {...props} />
    }
  }
}
