import React from "react"
import styled from "styled-components"
import Colors from "../../../assets/colors"
import { crop } from "../../../utils/resizer"
import { pMedia } from "../../helpers"
import Fonts from "../fonts"

interface DisplayCanvasProps extends React.HTMLProps<HTMLDivElement> {
  unit: any
  campaign: any
}

const DisplayCanvas: React.SFC<DisplayCanvasProps> = props => {
  const { unit, campaign } = props
  return (
    <DisplayCanvasContainer>
      <AdvertisementBy>{`Advertisement by ${campaign.name}`}</AdvertisementBy>
      <Canvas href={unit.link.url}>
        <Image src={crop(unit.image_url, { width: 680, height: 284 })} />
        <CanvasInner>
          <Logo src={unit.logo} />
          <Body dangerouslySetInnerHTML={{ __html: unit.body }} />
          <BodyLink>{unit.link.text}</BodyLink>
        </CanvasInner>
      </Canvas>
      {unit.disclaimer && <Disclaimer>{unit.disclaimer}</Disclaimer>}
    </DisplayCanvasContainer>
  )
}

const DisplayCanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${Colors.grayRegular};
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  ${pMedia.xs`
    padding: 0 20px;
  `}
`
const Canvas = styled.a`
  width: 100%;
  height: 460px;
  text-decoration: none;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  position: relative;
  ${pMedia.xs`
    padding: 0 20px;
  `}
`
const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  max-height: 460px;
  object-fit: cover;
  position: absolute;
  opacity: .7;
`
const CanvasInner = styled.div`
  max-width: 500px;
  z-index: 2;
`
const Logo = styled.img`
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 120px;
  object-fit: contain;
  margin-bottom: 60px;
`
const Body = styled.div`
  ${Fonts.garamond("s23")}
  line-height: 1.35em;
`
const BodyLink = Body.extend`
  display: initial;
  background-image: linear-gradient(to bottom, transparent 0, #FFF 2px, transparent 0);
  background-position: bottom;
  background-size: 1px 5px;
  background-repeat: repeat-x;
`
const AdvertisementBy = styled.div`
  ${Fonts.avantgarde("s11")}
  color: ${Colors.grayRegular};
  margin: 10px 0;
`
const Disclaimer = styled.div`
  ${Fonts.garamond("s11")}
  color: ${Colors.grayRegular};
  margin: 15px 0;
`
export default DisplayCanvas
