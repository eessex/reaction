import { storiesOf } from "@storybook/react"
import { ContextProvider } from "Artsy/SystemContext"
import { StandardArticle } from "Components/Publishing/Fixtures/Articles"
import { StyledText } from "Components/Publishing/Sections/Text/StyledText"
import { LinkWithTooltip } from "Components/Publishing/ToolTip/LinkWithTooltip"
import { TooltipsData } from "Components/Publishing/ToolTip/TooltipsDataLoader"
import React from "react"

const tracking = { trackEvent: x => x, getTrackingData: x => x } as any

storiesOf("Publishing/ToolTips/", module)
  .add("Artist", () => {
    return (
      <div style={{ maxWidth: 580, margin: "50px auto 0 auto" }}>
        <ContextProvider>
          <TooltipsData article={StandardArticle}>
            <StyledText layout="standard">
              <LinkWithTooltip
                url="https://artsy.net/artist/fra-angelico"
                tracking={tracking}
              >
                Fra Angelico
              </LinkWithTooltip>
              {`, `}
              <LinkWithTooltip
                url="https://artsy.net/artist/judy-chicago"
                tracking={tracking}
              >
                Judy Chicago
              </LinkWithTooltip>
              {`, and `}
              <LinkWithTooltip
                url="https://artsy.net/artist/alfred-stieglitz"
                tracking={tracking}
              >
                Alfred Stieglitz
              </LinkWithTooltip>
            </StyledText>
          </TooltipsData>
        </ContextProvider>
      </div>
    )
  })
  .add("Gene", () => {
    return (
      <div style={{ maxWidth: 580, margin: "50px auto" }}>
        <ContextProvider>
          <TooltipsData article={StandardArticle}>
            <StyledText layout="standard">
              <LinkWithTooltip
                url="https://artsy.net/gene/art-nouveau"
                tracking={tracking}
              >
                Art Nouveau
              </LinkWithTooltip>
              {` and `}
              <LinkWithTooltip
                url="https://artsy.net/gene/art-deco"
                tracking={tracking}
              >
                Art Deco
              </LinkWithTooltip>
            </StyledText>
          </TooltipsData>
        </ContextProvider>
      </div>
    )
  })
