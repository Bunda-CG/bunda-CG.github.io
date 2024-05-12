import * as cf from "../config.js";
import * as fn from "../function.js";
export class Keyframe {
  constructor(endTime, transformation, params, speed) {
    this.endTime = endTime;
    this.transformation = transformation;
    this.params = params;
    this.speed = speed;
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

  getTransformSpeed(keyframes, keyframePointer, timeNow) {
    const thisFrame = keyframes[keyframePointer];
    let thisFrameEnd = thisFrame.endTime;
    let thisFrameStart =
      keyframePointer > 0 ? keyframes[keyframePointer - 1].endTime : 0;
    let duration = thisFrameEnd - thisFrameStart;
    let progress = (timeNow - thisFrameStart) / duration;
    let speed = thisFrame.speed(progress);
    speed = (speed * cf.FRAME_TIME) / duration;
    return speed;
  }

  update() {
    let currentTime = this.timer.howLong();
    this.objectList.forEach((obj) => {
      const keyframes = obj.keyframes;
      let framePointer = this.findFramePointer(keyframes, currentTime);
      if (framePointer < 0) return;

      const keyframe = keyframes[framePointer];
      let speed = this.getTransformSpeed(keyframes, framePointer, currentTime);
      keyframe.transformation(obj, ...keyframe.params, speed);
    });
  }
}
