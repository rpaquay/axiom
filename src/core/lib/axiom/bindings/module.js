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

import BaseBinding from 'axiom/bindings/base';
import ServiceBinding from 'axiom/bindings/service';

/**
 * @constructor
 * @param {ModuleManager} moduleManager
 * @param {string} moduleId
 * @param {Object} descriptor
 */
export var ModuleBinding = function(moduleManager, descriptor) {
  BaseBinding.call(this);

  if (!descriptor.id)
    throw new AxiomError.Missing('module-id');

  if (!descriptor.version)
    throw new AxiomError.Missing('version');

  this.moduleManager = moduleManager;
  this.moduleId = descriptor.id;
  this.version = descriptor.version;
  this.descriptor = descriptor;

  /**
   * Services that we provide, keyed by the bare service id.
   */
  this.serviceBindings_ = new Map();

  // Temporary used in loops below.
  var serviceBinding;

  if (descriptor['provides']) {
    for (var serviceId in descriptor['provides']) {
      serviceBinding = new ServiceBinding(
          this, serviceId, descriptor['provides'][serviceId]);
      this.serviceBindings_.set(serviceId, serviceBinding);
    }
  }

  /**
   * Extensions we define, keyed by the target module-service-id.
   */
  this.extensionBindings_ = new Map();

  if (descriptor['extends']) {
    for (var moduleServiceId in descriptor['extends']) {
      serviceBinding = this.moduleManager.getServiceBinding(moduleServiceId);
      var extensionBinding = serviceBinding.extend(
          this, descriptor['extends'][moduleServiceId]);
      this.extensionBindings_.set(moduleServiceId, extensionBinding);
    }
  }
};

export default ModuleBinding;

ModuleBinding.prototype = Object.create(BaseBinding.prototype);

ModuleBinding.prototype.getServiceBinding = function(serviceId) {
  if (!this.serviceBindings_.has(serviceId))
    throw new AxiomError.NotFound('service-id', serviceId);
  return this.serviceBindings_.get(serviceId);
};

ModuleBinding.prototype.getExtensionBinding = function(moduleServiceId) {
  if (!this.extensionBindings_.has(moduleServiceId))
    throw new AxiomError.NotFound('module-service-id', moduleServiceId);
  return this.extensionBindings_.get(moduleServiceId);
};
