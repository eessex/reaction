import chalk from "chalk"
import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import "regenerator-runtime/runtime"
import { format } from "util"

jest.mock("react-tracking")
import _track from "react-tracking"
const track = _track as jest.Mock<typeof _track>
track.mockImplementation(y => x => x as any)

jest.mock("react-sizeme", () => jest.fn(c => d => d))
jest.mock("Utils/logger")

/**
 * We want each test to have assertions, otherwise it’s too easy to write async
 * tests that never end up making any, leading to false positives.
 *
 * TODO: Find a way to make this not emit after failing tests.
 *
 * SEE: https://github.com/facebook/jest/issues/2209#issuecomment-458706599
 */
// afterEach(() => expect.hasAssertions())

import "DevTools/renderUntil"
Enzyme.configure({ adapter: new Adapter() })

import "jsdom"

if (typeof window !== "undefined") {
  window.open = jest.fn()
  // @ts-ignore
  window.matchMedia = undefined
  window.grecaptcha = {
    ready: jest.fn(cb => cb()),
    execute: jest.fn().mockResolvedValue("recaptcha-token"),
  }
  window.scrollTo = jest.fn()
  HTMLMediaElement.prototype.pause = jest.fn()
  HTMLMediaElement.prototype.play = jest.fn()
}

if (process.env.ALLOW_CONSOLE_LOGS !== "true") {
  const originalLoggers = {
    error: console.error,
    warn: console.warn,
  }

  function logToError(type, args, constructorOpt: () => void) {
    const explanation =
      chalk.white(`Test failed due to \`console.${type}(…)\` call.\n`) +
      chalk.gray("(Disable with ALLOW_CONSOLE_LOGS=true env variable.)\n\n")
    if (args[0] instanceof Error) {
      const msg = explanation + chalk.red(args[0].message)
      const err = new Error(msg)
      err.stack =
        args[0].stack && args[0].stack.replace(`Error: ${args[0].message}`, msg)
      return err
    } else {
      const err = new Error(
        explanation + chalk.red(format(args[0], ...args.slice(1)))
      )
      Error.captureStackTrace(err, constructorOpt)
      return err
    }
  }

  beforeEach(done => {
    ;["error", "warn"].forEach((type: "error" | "warn") => {
      // Don't spy on loggers that have been modified by the current test.
      if (console[type] === originalLoggers[type]) {
        const handler = (...args) => done.fail(logToError(type, args, handler))
        jest.spyOn(console, type).mockImplementation(handler)
      }
    })
    done() // it is important to call this here or every test will timeout
  })
}
