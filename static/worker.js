importScripts("skulpt.min.js", "skulpt-stdlib.js")
let Sk = self.Sk
postMessage({ type: "ready" })

let printBuffer = []
let intervalId = null
const batchSize = 200
let running = false
let testing = false

// used to check if a control message "input_required" has been appended to buffer
const checkForMsg = () => {
  let msgObject = null
  if (typeof printBuffer[printBuffer.length - 1] === "object") {
    msgObject = printBuffer.pop()
  }
  return msgObject
}

const intervalManager = runInterval => {
  if (intervalId) {
    clearInterval(intervalId)
  }
  if (runInterval) {
    intervalId = setInterval(() => {
      if (printBuffer.length > 0) {
        let msgObject = null
        if (printBuffer.length <= batchSize) {
          msgObject = checkForMsg()
        }
        const batch = printBuffer.splice(0, batchSize)
        postMessage({ type: "print_batch", msg: batch })
        if (msgObject) postMessage(msgObject)
      }
      if (!running && printBuffer.length === 0) {
        clearInterval(intervalId)
        postMessage({ type: "print_done" })
      }
    }, 100)
  }
}

let testResults = []
let testPoints = []
// Running tests requires verbosity > 1 from unittest
// Make sure to run with command unittest.main(2) or equal
const handleTestOutput = text => {
  console.log(text)
  if (text.startsWith("Running")) {
    const testName = text.split(" ")[2]
    const matchingPoint = testPoints.find(
      t =>
        t.name === testName.split(".")[0] || t.name === testName.split(".")[1],
    )
    testResults.push({
      testName,
      passed: true,
      points: matchingPoint ? matchingPoint.points : "",
    })
  } else if (
    text.startsWith("Fail:") ||
    text.startsWith("Test threw exception")
  ) {
    const lastResult = testResults.pop()
    const updatedResult = { ...lastResult, passed: false, feedback: text }
    testResults.push(updatedResult)
  } else if (text.startsWith("Points:")) {
    const pointObj = JSON.parse(text.slice(7))
    testPoints.push(pointObj)
  }
}

let prevDate = null

function outf(text) {
  if (testing) {
    handleTestOutput(text)
  } else {
    printBuffer.push(text)
    const newDate = Date.now()
    if (newDate - prevDate > 50) {
      postMessage({
        type: "print_batch",
        msg: printBuffer.splice(0, batchSize),
      })
      prevDate = newDate
    }
  }
}

function builtinRead(x) {
  if (
    Sk.builtinFiles === undefined ||
    Sk.builtinFiles["files"][x] === undefined
  )
    throw "File not found: '" + x + "'"
  return Sk.builtinFiles["files"][x]
}

function run(code) {
  if (!code || code.length === 0) return
  Sk.execLimit = 10000
  Sk.inputfun = function() {
    printBuffer.push({ type: "input_required" })
    return new Promise((resolve, reject) => {
      self.addEventListener("message", function(e) {
        if (e.data.type === "input") {
          resolve(e.data.msg)
          Sk.execStart = new Date()
        }
      })
    })
  }
  Sk.configure({
    output: outf,
    read: builtinRead,
    __future__: Sk.python3,
  })

  Sk.misceval
    .asyncToPromise(function() {
      return Sk.importMainWithBody("<stdin>", false, code, true)
    })
    .then(e => {
      console.log("running skulpt completed")
      if (testing) {
        postMessage({ type: "testResults", msg: testResults })
        testResults = []
        testPoints = []
      }
      postMessage({ type: "ready" })
    })
    .catch(e => {
      console.log(e)
      postMessage({ type: "error", msg: e.toString() })
    })
    .finally(() => {
      running = false
      testing = false
    })
}

const defaultTest = `
import unittest
import StringIO
import sys

def hello():
    print('Hello world!')

def points(*args):
    def jsonify_arr(arr):
        return str(arr).replace("'", '"')

    def wrapper(fn):
        print('Points: {"name": "{}", "points": {}}'.format(fn.__name__, jsonify_arr(list(args))))
        return fn
    return wrapper

class TestStringMethods(unittest.TestCase):

    @points('1.1')
    def test_upper(self):
        self.assertEqual('foo'.upper(), 'FOO')

    @points('1.2')
    def test_isupper(self):
        self.assertTrue('FOO'.isupper())
        self.assertFalse('Foo'.isupper())

class TestOtherThings(unittest.TestCase):

    @points('2.1')
    def test_failing(self):
        self.assertEqual('foobar', 'foo')

    @points('2.2')
    def test_hello(self):
        sys.stdout = StringIO.StringIO()
        hello()
        output = sys.stdout.getvalue().strip()
        sys.stdout = sys.__stdout__

        self.assertEqual(output, 'Hello world!')

@points('3.1', '3.2')
class TestClassPoints(unittest.TestCase):

    def test_true(self):
        self.assertEqual('foo', 'foo')

    def test_trueagain(self):
        self.assertEqual('foo', 'foo')

if __name__ == '__main__':
    # Running tests requires verbosity > 1 at the moment
    # Make sure to run with command unittest.main(2) or equal
    unittest.main(2)
`

self.onmessage = function(e) {
  const { type, msg } = e.data
  if (type === "run") {
    intervalManager(true)
    running = true
    printBuffer = []
    run(msg)
  } else if (type === "stop") {
    intervalManager(false)
  } else if (type === "runTests") {
    testing = true
    if (!msg) {
      run(defaultTest)
    } else {
      run(msg)
    }
  }
}
