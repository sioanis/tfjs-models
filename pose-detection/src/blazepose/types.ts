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

import {EstimationConfig, ModelConfig} from '../types';

/**
 * Additional Blazepose model loading config.
 *
 * `upperBodyOnly`: Optional. Default to false. If upperBody is true, then the
 * detector only detects 25 keypoints of the upperbody. The upperbody model
 * has a higher accuracy for upperbody prediction than the fullbody model. If
 * upperBody is false, then the detector detects 33 keypoints of the full body.
 *
 * `detectorModelUrl`: Optional. An optional string that specifies custom url of
 * the detector model. This is useful for area/countries that don't have access
 * to the model hosted on GCP.
 *
 * `landmarkModelUrl`: Optional. An optional string that specifies custom url of
 * the landmark model. This is useful for area/countries that don't have access
 * to the model hosted on GCP.
 */
export interface BlazeposeModelConfig extends ModelConfig {
  upperBodyOnly?: boolean;
  lite?: boolean;
  detectorModelUrl?: string;
  landmarkModelUrl?: string;
}

export interface BlazeposeEstimationConfig extends EstimationConfig {
  enableSmoothing?: boolean;
}
