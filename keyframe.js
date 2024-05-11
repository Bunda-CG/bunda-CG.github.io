export class Keyframe {
  constructor(endTime, transformation, params, progressFunction) {
    this.endTime = endTime.toFixed(0);
    this.transformation = transformation;
    this.params = params;
    this.progressFunction = progressFunction;
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

  getTransformProgress(keyframes, keyframePointer, timeNow) {
    const thisFrame = keyframes[keyframePointer];
    let thisFrameEnd = thisFrame.endTime;
    let thisFrameStart =
      keyframePointer > 0 ? keyframes[keyframePointer - 1].endTime : 0;
    let duration = thisFrameEnd - thisFrameStart;
    let progress = (timeNow - thisFrameStart) / duration;
    return this.progressFunction(progress);
  }

  update() {
    let currentTime = timer.howLong();
    this.objectList.forEach((obj) => {
      const keyframes = obj.keyframes;
      let framePointer = this.findFramePointer(keyframes, currentTime);
      const keyframe = keyframes[framePointer];
      let progress = this.getTransformProgress(
        keyframes,
        framePointer,
        currentTime
      );
      keyframe.progressFunction(...keyframe.params, progress);
    });
  }
}
