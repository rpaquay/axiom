// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

function verify(cond, message, text) {
  if (!message)
    message = 'Assertion failed';
  if (!text)
    text = '';

  if (!cond) {
    throw new Error(message, message + ': ' + text);
  }
}

/**
 * Runtime checks.
 */
export var Check = {
  'true': function(cond, message, text) {
    verify(cond, message, text);
  },

  'fail': function(message) {
    verify(false, message);
  },

  'eq': function(value, expectedValue, message) {
    if (value === expectedValue)
      return;

    verify(false, 'Value ' + value + ' is not the expected value ' + expectedValue, message);
  },

  'ne': function(value, expectedValue, message) {
    if (value !== expectedValue)
      return;

    verify(false, 'Value ' + value + ' should not be equal to ' + expectedValue, message);
  },

  'ge': function(value, expectedValue, message) {
    if (value >= expectedValue)
      return;

    verify(false, 'Value ' + value + ' is expected to be >= ' + expectedValue, message);
  },

  'le': function(value, expectedValue, message) {
    if (value <= expectedValue)
      return;

    verify(false, 'Value ' + value + ' is expected to be <= ' + expectedValue, message);
  },

  'in': function(value, expectedValues, message) {
    for (var i = 0; i < expectedValues.length; i++) {
      if (value === expectedValues[i])
        return;
    }
    var expectedValuesPrint = '[';
    for (i = 0; i < expectedValues.length; i++) {
      if (i > 0)
        expectedValuesPrint += ',';

      expectedValuesPrint += expectedValues[i];
    }
    expectedValuesPrint += ']';
    verify(false, 'Value ' + value + ' is one of ' + expectedValuesPrint, message);
  }
};

export default Check;
