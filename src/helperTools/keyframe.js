import * as cf from "../config.js";
import * as fn from "../function.js";
export class Keyframe {
  constructor(endTime, transformation, params, percent) {
    this.endTime = endTime;
    this.transformation = transformation;
    this.params = params;
    this.percent = percent;
  }
}

export class KeyframeCenter {
  constructor(objectList, timer) {
    this.objectList = objectList;
    this.timer = timer;
  }

  findFramePointer(keyframes, timeNow) {
    if (keyframes.length < 1) return -1;
    for (let i = 0; i < keyframes.length; i++) {
      let thisFrameEnd = keyframes[i].endTime;
      let thisFrameStart = i > 0 ? keyframes[i - 1].endTime : 0;
      if (timeNow > thisFrameStart && timeNow <= thisFrameEnd) return i;
    }
    return -1;
  }

  getTransformPercent(keyframes, keyframePointer, timeNow) {
    const thisFrame = keyframes[keyframePointer];
    let thisFrameEnd = thisFrame.endTime;
    let thisFrameStart =
      keyframePointer > 0 ? keyframes[keyframePointer - 1].endTime : 0;
    let duration = thisFrameEnd - thisFrameStart;
    let progress = (timeNow - thisFrameStart) / duration;
    let percent = thisFrame.percent(progress);
    return percent;
  }

  update() {
    let currentTime = this.timer.howLong();
    this.objectList.forEach((obj) => {
      const keyframes = obj.keyframes;
      let framePointer = this.findFramePointer(keyframes, currentTime);
      if (framePointer < 0) return;

      if (framePointer > obj.keyframePointer) {
        obj.updateReference();
        obj.keyframePointer++;
      }
      const keyframe = keyframes[framePointer];
      let percent = this.getTransformPercent(
        keyframes,
        framePointer,
        currentTime
      );
      keyframe.transformation(obj, ...keyframe.params, percent);
    });
  }
}
