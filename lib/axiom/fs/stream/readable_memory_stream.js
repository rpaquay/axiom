// Copyright 2015 Google Inc. All rights reserved.
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

import AxiomError from 'axiom/core/error';
import ReadableStream from 'axiom/fs/stream/readable_stream';

/** @typedef MemoryStreamBuffer$$module$axiom$fs$stream$memory_stream_buffer */
var MemoryStreamBuffer;

/** @typedef function(*):void */
var DataCallback;

/**
 * @constructor @extends {ReadableStream}
 * @param {MemoryStreamBuffer} buffer
 */
export var ReadableMemoryStream = function(buffer) {
  ReadableStream.call(this);
  /** @const @private @type {MemoryStreamBuffer} */
  this.buffer_ = buffer;
  this.onData = buffer.onData;
};

export default ReadableMemoryStream;

ReadableMemoryStream.prototype = Object.create(ReadableStream.prototype);

/**
 * @override
 * @return {void}
 */
ReadableMemoryStream.prototype.pause = function() {
  return this.buffer_.pause();
}

/**
 * @override
 * @return {void}
 */
ReadableMemoryStream.prototype.resume = function() {
  return this.buffer_.resume();
}

/**
 * @override
 * @return {*}
 */
ReadableMemoryStream.prototype.read = function() {
  return this.buffer_.read();
};