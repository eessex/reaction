import { storiesOf } from "@storybook/react"
import _ from "lodash"
import React from "react"

import { HeroSections } from "../Fixtures/Components"
import { EditableChild } from "../Fixtures/Helpers"
import { Header } from "../Header/Header"

import {
  BasicArticle,
  ClassicArticle,
  FeatureArticle,
  MissingVerticalStandardArticle,
  StandardArticle,
  SuperArticle,
} from "../Fixtures/Articles"

storiesOf("Publishing/Header/Classic", module)
  .add("Classic", () => {
    return (
      <div style={{ width: "100%", height: "400px", position: "relative" }}>
        <Header article={ClassicArticle} />
      </div>
    )
  })
  .add("Editable", () => {
    return (
      <div style={{ width: "100%", height: "400px", position: "relative" }}>
        <Header
          article={ClassicArticle}
          editLeadParagraph={EditableChild("Lead Paragraph")}
          editTitle={EditableChild("Title")}
        />
      </div>
    )
  })

storiesOf("Publishing/Header/Standard", module)
  .add("Standard", () => {
    return (
      <div style={{ width: "100%", position: "relative" }}>
        <Header article={StandardArticle} />
      </div>
    )
  })
  .add("Editable", () => {
    return (
      <div style={{ width: "100%", position: "relative" }}>
        <Header
          article={MissingVerticalStandardArticle}
          editTitle={EditableChild("Title")}
          editVertical="Missing Vertical"
        />
      </div>
    )
  })

storiesOf("Publishing/Header/Feature/Basic", module)
  .add("Basic", () => {
    const article = _.clone(BasicArticle)
    article.hero_section.url = null

    return (
      <div>
        <div style={{ width: "100%", position: "relative" }}>
          <Header article={BasicArticle} />
        </div>
      </div>
    )
  })
  .add("With Embed", () => {
    const article = _.clone(BasicArticle)
    article.hero_section.url = "https://vimeo.com/238843720"

    return (
      <div>
        <div style={{ width: "100%", position: "relative" }}>
          <Header article={BasicArticle} />
        </div>
      </div>
    )
  })
  .add("Editable", () => {
    const article = _.clone(BasicArticle)
    article.hero_section.url = "https://vimeo.com/238843720"

    return (
      <div>
        <div style={{ width: "100%", position: "relative" }}>
          <Header
            article={BasicArticle}
            editDeck={EditableChild("Deck")}
            editImage={EditableChild("Image")}
            editTitle={EditableChild("Title")}
            editVertical="Missing Vertical"
          />
        </div>
      </div>
    )
  })
storiesOf("Publishing/Header/Feature/Text", module)
  .add("With Image", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[0],
    })
    return (
      <div style={{ width: "100%", position: "relative" }}>
        <Header article={article} />
      </div>
    )
  })
  .add("With Video", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[5],
    })
    return (
      <div style={{ width: "100%", position: "relative" }}>
        <Header article={article} />
      </div>
    )
  })
  .add("Editable", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[5],
    })
    delete article.vertical

    return (
      <div style={{ width: "100%", position: "relative" }}>
        <Header
          article={article}
          editDeck={EditableChild("Deck")}
          editImage={EditableChild("Image")}
          editTitle={EditableChild("Title")}
          editVertical="Missing Vertical"
        />
      </div>
    )
  })
storiesOf("Publishing/Header/Feature/Split", module)
  .add("With Image", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[1],
    })
    return (
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <Header article={article} />
      </div>
    )
  })
  .add("With Video", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[3],
    })
    return (
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <Header article={article} />
      </div>
    )
  })
  .add("Editable", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[3],
    })
    delete article.vertical

    return (
      <div style={{ width: "100%", position: "relative" }}>
        <Header
          article={article}
          editDeck={EditableChild("Deck")}
          editImage={EditableChild("Image")}
          editTitle={EditableChild("Title")}
          editVertical="Missing Vertical"
        />
      </div>
    )
  })
storiesOf("Publishing/Header/Feature/Fullscreen", module)
  .add("With Image", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[2],
    })
    return (
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <Header article={article} />
      </div>
    )
  })
  .add("With Video", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[4],
    })
    return (
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <Header article={article} />
      </div>
    )
  })
  .add("Editable", () => {
    const article = _.extend({}, FeatureArticle, {
      hero_section: HeroSections[4],
    })
    delete article.vertical

    return (
      <div style={{ width: "100%", position: "relative" }}>
        <Header
          article={article}
          editDeck={EditableChild("Deck")}
          editImage={EditableChild("Image")}
          editTitle={EditableChild("Title")}
          editVertical="Missing Vertical"
        />
      </div>
    )
  })
  .add("Super Article", () => {
    const article = _.extend({}, SuperArticle, {
      hero_section: HeroSections[2],
    })

    return (
      <div style={{ width: "100%", height: "100vh", position: "relative" }}>
        <Header article={article} />
      </div>
    )
  })
