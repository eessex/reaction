import { storiesOf } from "@storybook/react"
import * as React from "react"
import DisplayCanvas from "../display/canvas"
import { Campaign, UnitCanvas } from "../fixtures/components"

storiesOf("Publishing/Display", module).add("Panel", () => {
  return <DisplayCanvas unit={UnitCanvas} campaign={Campaign} />
})
