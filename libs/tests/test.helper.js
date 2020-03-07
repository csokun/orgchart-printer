const assert = require('assert').strict;

function test(name, fn, expected) {
  try {
    const actual = fn();
    assert.deepEqual(actual, expected);
    console.log(` + ${name} - Passed!`);
  } catch (e) {
    console.log(` - ${name} - Failed!`);
    throw e;
  }
}

module.exports = { test };
