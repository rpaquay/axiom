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

import AxiomError from 'axiom/core/error';
import Path from 'axiom/fs/path';

import environment from 'axiom_shell/environment';
import util from 'axiom_shell/util';

export var main = function(executeContext) {
  executeContext.ready();

  var arg = executeContext.arg;
  if (!arg._ && arg._.length)
    return Promise.reject(new AxiomError.Missing('path'));

  var fileSystem = environment.getServiceBinding('filesystems@axiom');

  var catNext = function() {
    if (!arg._.length)
      return Promise.resolve(null);

    var pathSpec = arg._.shift();
    pathSpec = Path.abs(executeContext.getEnv('$PWD', '/'), pathSpec);

    return fileSystem.readFile(pathSpec, {read: true}).then(
        function(data) {
      executeContext.stdout(data.data);
      return catNext();
    }).catch(function(e) {
      return catNext();
    });
  };

  return catNext();
};

export default main;

main.argSigil = '%';
