import url from "url"
import { defer } from "lodash"
import { findDOMNode } from "react-dom"
import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { track } from "../../../Utils/track"
import { ToolTip } from "./ToolTip"
import Colors from "Assets/Colors"
import FadeTransition from "../../Animation/FadeTransition"

interface Props {
  url: string
  showMarketData?: boolean
  tracking?: any
}

interface State {
  inToolTip: boolean
  maybeHideToolTip: boolean
  position: ClientRect
  orientation?: string
}

export class LinkWithTooltip extends Component<Props, State> {
  static contextTypes = {
    tooltipsData: PropTypes.object,
    onTriggerToolTip: PropTypes.func,
    activeToolTip: PropTypes.any,
    waitForFade: PropTypes.string,
  }

  public link: any
  public SetupToolTipPosition: any

  state = {
    inToolTip: false,
    maybeHideToolTip: false,
    position: null,
    orientation: "up",
  }

  urlToEntityType(): { entityType: string; slug: string } {
    const urlComponents = url.parse(this.props.url).pathname.split("/")
    urlComponents.shift()

    return {
      entityType: urlComponents[0],
      slug: urlComponents[1],
    }
  }

  componentDidMount() {
    this.SetupToolTipPosition = () => defer(this.setupToolTipPosition)
    this.setupToolTipPosition()

    window.addEventListener("scroll", this.SetupToolTipPosition)
    window.addEventListener("resize", this.SetupToolTipPosition)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.SetupToolTipPosition)
    window.removeEventListener("resize", this.SetupToolTipPosition)
  }

  entityTypeToEntity = () => {
    const { entityType, slug } = this.urlToEntityType()
    const data = this.context.tooltipsData
    const collectionKey = entityType + "s"

    if (!data || !data[collectionKey]) return null

    return {
      entityType,
      entity: data[collectionKey][slug],
    }
  }

  showToolTip = toolTipData => {
    const { tracking } = this.props
    const { onTriggerToolTip } = this.context
    const { entity, entityType } = toolTipData

    if (entity) {
      onTriggerToolTip(entity.id)

      tracking.trackEvent({
        action: "Viewed tooltip",
        type: "intext tooltip",
        entity_type: entityType,
        entity_id: entity._id,
        entity_slug: entity.id,
      })
    }
  }

  trackClick = toolTipData => {
    const { tracking, url } = this.props
    const { entity, entityType } = toolTipData

    if (entity) {
      tracking.trackEvent({
        action: "Click",
        flow: "tooltip",
        type: `${entityType} stub`,
        context_module: "intext tooltip",
        destination_path: url,
      })
    }
  }

  leftLink = () => {
    this.setState({ maybeHideToolTip: true })
  }

  hideToolTip = () => {
    this.context.onTriggerToolTip(null)

    this.setState({
      inToolTip: false,
      maybeHideToolTip: false,
    })
  }

  maybeHideToolTip = () => {
    const { inToolTip, maybeHideToolTip } = this.state
    setTimeout(() => {
      if (!inToolTip && maybeHideToolTip) {
        this.hideToolTip()
      }
    }, 750)
  }

  onLeaveLink = () => {
    this.leftLink()
    defer(this.maybeHideToolTip)
  }

  getToolTipPosition = type => {
    if (this.link) {
      const { width, x } = this.state.position
      const anchorPosition = width / 2
      const toolTipWidth = type === "artist" ? 360 : 280

      const toolTipLeft = anchorPosition - toolTipWidth / 2
      const isAtWindowBoundary = x + toolTipLeft < 10

      if (isAtWindowBoundary) {
        return 10 - x
      } else {
        return toolTipLeft
      }
    }
  }

  getOrientation = position => {
    const height = window ? window.innerHeight : 0
    const linkPosition = position.top
    const orientation = height - linkPosition > 350 ? "down" : "up"

    return orientation
  }

  setupToolTipPosition = () => {
    if (this.link) {
      const position = findDOMNode(this.link).getBoundingClientRect()
      const orientation = this.getOrientation(position)

      this.setState({ position, orientation })
    }
  }

  render() {
    const { showMarketData, url } = this.props
    const { activeToolTip, waitForFade } = this.context
    const { orientation } = this.state

    const toolTipData = this.entityTypeToEntity()
    const { entity, entityType } = toolTipData
    const id = entity ? entity.id : null
    const toolTipLeft = this.getToolTipPosition(entityType)
    const show = id ? id === activeToolTip : false
    const showWithFade = show || waitForFade === id

    return (
      <Link
        onMouseEnter={() => {
          !show && this.showToolTip(toolTipData)
        }}
        ref={link => (this.link = link)}
        show={showWithFade}
      >
        <PrimaryLink
          href={url}
          target="_blank"
          show={showWithFade}
          onClick={() => this.trackClick(toolTipData)}
        >
          {this.props.children}
        </PrimaryLink>

        <FadeContainer>
          <FadeTransition
            in={show}
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 200, exit: 250 }}
          >
            <ToolTip
              entity={entity}
              model={entityType}
              showMarketData={showMarketData}
              onMouseLeave={this.hideToolTip}
              onMouseEnter={() => {
                this.setState({ inToolTip: true })
              }}
              positionLeft={toolTipLeft}
              orientation={orientation}
            />
          </FadeTransition>
        </FadeContainer>

        {show && (
          <Background
            onMouseLeave={this.onLeaveLink}
            href={url}
            target="_blank"
            onClick={() => this.trackClick(toolTipData)}
          />
        )}
      </Link>
    )
  }
}

export const PrimaryLink = styled.a.attrs<{ show: boolean; onClick: any }>({})`
  z-index: auto;
  color: black;
  transition: color 0.25s;
  background-image: linear-gradient(
    to right,
    ${Colors.graySemibold} 50%,
    transparent 50%
  ) !important;
  background-size: 3px 1.75px !important;
  background-position: 0 1.07em !important;
  ${props =>
    props.show &&
    `
    color: ${Colors.grayDark} !important;
    background-image: linear-gradient(
      to right,
      ${Colors.grayDark} 50%,
      transparent 50%
    ) !important;
  `};
`

const FadeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
`

export const Link = styled.div.attrs<{ onMouseEnter: any; show: boolean }>({})`
  display: inline-block;
  position: relative;
  cursor: pointer;
  z-index: ${props => (props.show ? 10 : 0)};
  ${FadeContainer} {
    ${props => props.show && `z-index: 10`};
  }
`

export const Background = styled.a`
  position: absolute;
  left: 0;
  top: -10px;
  bottom: -10px;
  right: 0;
  z-index: 10;
  background-image: none !important;
`

export default track()(LinkWithTooltip)
