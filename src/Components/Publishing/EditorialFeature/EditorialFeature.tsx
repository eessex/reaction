import { ArticleProps } from "Components/Publishing/Article"
import { ArticleWithFullScreen } from "Components/Publishing/Layouts/ArticleWithFullScreen"
import { FeatureLayout } from "Components/Publishing/Layouts/FeatureLayout"
import React from "react"
import { Eoy2018Artists } from "./Components/Eoy2018Artists"
import { Eoy2018Culture } from "./Components/Eoy2018Culture"

export interface EditorialFeaturesProps extends ArticleProps {
  isTest?: boolean
}

export class EditorialFeature extends React.Component<EditorialFeaturesProps> {
  static defaultProps = {
    // A flag to indicate whether component is being tested
    // this was implemented to account for randomly ordered elements
    // in EOY_2018_ARTISTS do not fail snapshot tests
    isTest: false,
  }

  renderLayoutComponent() {
    switch (this.props.customEditorial) {
      case "EOY_2018_ARTISTS": {
        return <Eoy2018Artists {...this.props} />
      }
      case "EOY_2018_CULTURE": {
        return <Eoy2018Culture {...this.props} />
      }
      default: {
        return <FeatureLayout {...this.props} />
      }
    }
  }
  render() {
    return (
      <ArticleWithFullScreen {...this.props}>
        {this.renderLayoutComponent()}
      </ArticleWithFullScreen>
    )
  }
}
