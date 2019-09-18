import { mount } from "enzyme"
import * as React from "react"
import { MockRelayRenderer } from "../MockRelayRenderer"

describe("MockRelayRenderer", () => {
  const consoleError = console.error

  beforeAll(() => {
    console.error = jest.fn()
  })

  afterAll(() => {
    console.error = consoleError
  })

  it("throws when react-relay is mocked", () => {
    expect(() => {
      mount(
        // @ts-ignore
        <MockRelayRenderer Component={null} query={null} mockResolvers={{}} />
      )
    }).toThrowError('jest.unmock("react-relay")')
  })
})
