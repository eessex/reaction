import { storiesOf } from "@storybook/react"
import * as React from "react"
import DisplayCanvas from "../display/canvas"
import { Campaign, UnitCanvasOverlay, UnitCanvasStandard } from "../fixtures/components"

storiesOf("Publishing/Display", module)
  .add("Canvas: Overlay", () => {
    return <DisplayCanvas unit={UnitCanvasOverlay} campaign={Campaign} />
  })
  .add("Canvas: Standard", () => {
    return <DisplayCanvas unit={UnitCanvasStandard} campaign={Campaign} />
  })
