/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as posedetection from '@tensorflow-models/posedetection';

import {STATE, VIDEO_SIZE} from './params';

export function setupDatGui() {
  const gui = new dat.GUI({width: 300});

  // The camera folder contains options for video settings.
  const cameraFolder = gui.addFolder('Camera');
  const fpsController = cameraFolder.add(STATE.camera, 'targetFPS');
  fpsController.onFinishChange((targetFPS) => {
    STATE.changeToTargetFPS = +targetFPS;
  });
  const sizeController =
      cameraFolder.add(STATE.camera, 'sizeOption', Object.keys(VIDEO_SIZE));
  sizeController.onChange(option => {
    STATE.changeToSizeOption = option;
  });
  cameraFolder.open();

  // The model folder contains options for model selection.
  const modelFolder = gui.addFolder('Model');
  const modelController = modelFolder.add(
      STATE.model, 'model', Object.values(posedetection.SupportedModels));
  modelController.onChange(model => {
    STATE.changeToModel = model;
    switch (model) {
      case posedetection.SupportedModels.PoseNet:
        poseNetFolder.open();
        blazePoseFolder.close();
        break;
      case posedetection.SupportedModels.MediapipeBlazepose:
        blazePoseFolder.open();
        poseNetFolder.close();
        break;
      default:
        throw new Error(`${model} is not supported.`);
    }
  });
  modelFolder.open();

  // The PoseNet model config folder contains options for PoseNet config
  // settings.
  const poseNetFolder = gui.addFolder('PoseNet Config');
  poseNetFolder.add(
      STATE.model[posedetection.SupportedModels.PoseNet], 'scoreThreshold', 0,
      1);
  poseNetFolder.open();

  // The Blazepose model config folder contains options for Blazepose config
  // settings.
  const blazePoseFolder = gui.addFolder('MediapipeBlazepose Config');
  blazePoseFolder.add(
      STATE.model[posedetection.SupportedModels.MediapipeBlazepose],
      'scoreThreshold', 0, 1);

  return gui;
}
