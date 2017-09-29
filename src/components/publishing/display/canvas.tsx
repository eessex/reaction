import React from "react"
import styled, { StyledFunction } from "styled-components"
import Colors from "../../../assets/colors"
import { crop } from "../../../utils/resizer"
import { pMedia } from "../../helpers"
import Fonts from "../fonts"

interface DisplayCanvasProps extends React.HTMLProps<HTMLDivElement> {
  unit: any
  campaign: any
}

interface UnitProps extends React.HTMLProps<HTMLDivElement> {
  layout?: string
}

function renderImage(unit) {
  if (unit.layout === "overlay") {
    return <Image layout={unit.layout} src={crop(unit.images[0], { width: 1200, height: 460 })} />
  } else if (unit.layout === "standard") {
    return <Image layout={unit.layout} src={crop(unit.images[0], { width: 760, height: 460 })} />
  }
}

const DisplayCanvas: React.SFC<DisplayCanvasProps> = props => {
  const { unit, campaign } = props
  const body = <Body dangerouslySetInnerHTML={{ __html: unit.body }} />
  const headline = <Headline>{unit.headline}</Headline>
  const content = unit.layout === "overlay" ? body : headline
  const disclaimer = unit.disclaimer && <Disclaimer>{unit.disclaimer}</Disclaimer>

  return (
    <DisplayCanvasContainer layout={unit.layout}>
      <AdvertisementBy layout={unit.layout}>{`Advertisement by ${campaign.name}`}</AdvertisementBy>
      <Canvas href={unit.link.url} layout={unit.layout}>
        {renderImage(unit)}
        <CanvasInner layout={unit.layout}>
          <Logo src={unit.logo} layout={unit.layout} />
          <div>
            {content}
            <BodyLink layout={unit.layout}>{unit.link.text}</BodyLink>
          </div>
          {unit.layout !== "overlay" && disclaimer}
        </CanvasInner>
      </Canvas>
      {unit.layout === "overlay" && disclaimer}
    </DisplayCanvasContainer>
  )
}

const div: StyledFunction<UnitProps> = styled.div
const img: StyledFunction<UnitProps> = styled.img
const a: StyledFunction<UnitProps> = styled.a

const DisplayCanvasContainer = div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  ${props => props.layout === "overlay" && "text-align: center;"}
  ${pMedia.xs`
    padding: 0 20px;
  `}
`
const Canvas = a`
  width: 100%;
  height: 460px;
  text-decoration: none;
  display: flex;
  flex-direction: ${props => (props.layout === "overlay" ? "column;" : "row-reverse;")}
  color: ${props => (props.layout === "overlay" ? "#FFFFFF" : "#000")};
  justify-content: center;
  align-items: center;
  ${props => props.layout === "overlay" && "background-color: #000;"}
  position: relative;
  ${pMedia.xs`
    padding: 0 20px;
    max-width: calc(100% - 40px);
    flex-direction: column;
  `}
`
const Image = img`
  display: block;
  width: ${props => (props.layout === "overlay" ? "100%;" : "65%;")}
  height: 100%;
  max-height: 460px;
  object-fit: cover;
  position: ${props => (props.layout === "overlay" ? "absolute;" : "relative;")}
  ${props => props.layout === "overlay" && "opacity: .7;"}
`
const CanvasInner = div`
  max-width: 500px;
  width: 100%;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.layout === "overlay" ? "space-around;" : "space-between;")}
  ${props => props.layout === "overlay" && "align-items: center;"}
  ${props => props.layout !== "overlay" && "padding: 0 20px;"}
`
const Headline = styled.div`
  ${Fonts.garamond("s40")}
  margin-bottom: 25px;
  ${pMedia.xs`
    ${Fonts.garamond("s23")}
    line-height: 1.25em;
  `}
  `
const Logo = img`
  width: 100%;
  height: 100%;
  max-width: ${props => (props.layout === "overlay" ? "500px;" : "185px;")}
  max-height:  ${props => (props.layout === "overlay" ? "120px;" : "65px;")};
  object-fit: contain;
  margin:  ${props => (props.layout === "overlay" ? "60px 0;" : "20px 0;")};
  ${pMedia.xs`
    max-width: calc(100% - 40px);
  `}
`
const Body = div`
  ${Fonts.garamond("s23")}
  line-height: 1.35em;
  margin-bottom: 10px;
  ${pMedia.xs`
    ${Fonts.garamond("s17")}
    line-height: 1.35em;
  `}
`
const BodyLink = Body.extend`
  display: initial;
  background-image: linear-gradient(to bottom, transparent 0, ${props =>
    props.layout === "overlay" ? "#fff" : "#000"} 2px, transparent 0);
  background-position: bottom;
  background-size: 1px 5px;
  background-repeat: repeat-x;
`
const AdvertisementBy = div`
  ${Fonts.avantgarde("s11")}
  color: ${Colors.grayRegular};
  margin: 10px 0;
  text-align: center;
`
const Disclaimer = div`
  ${Fonts.garamond("s11")}
  color: ${Colors.grayRegular};
  margin: ${props => (props.layout === "overlay" ? "15px 0;" : "15px 0 0 0;")}
  ${pMedia.xs`
    margin: 15px 5px;
  `}
`
export default DisplayCanvas
