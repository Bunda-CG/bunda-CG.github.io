import * as anim from "./animation.js";
export class Keyframe {
  constructor(endTime, transformation, params, percent) {
    this.endTime = endTime;
    this.transformation = transformation;
    this.params = params;
    this.percent = percent;
  }
}

export class KeyframeCenter {
  constructor(scenes, timer) {
    this.scenes = scenes;
    this.timer = timer;
  }

  setShowScene(scene, isShow) {
    for (const property in scene) {
      if (!(scene[property] instanceof anim.obj)) continue;
      scene[property].isShow = isShow;
    }
  }

  updateScene(timeNow) {
    this.scenes.forEach((scene) => {
      let startAt = scene.startAt;
      let endAt = scene.endAt;
      if (timeNow < startAt) {
        // before this scene
        this.setShowScene(scene, false);
      } else if (timeNow >= endAt) {
        // after scene
        this.setShowScene(scene, false);
      } else {
        // in scene
        this.setShowScene(scene, true);
      }
    });
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

  transformObject(object, currentTime) {
    if (!(object instanceof anim.obj)) return;

    const keyframes = object.keyframes;
    let framePointer = this.findFramePointer(keyframes, currentTime);
    if (framePointer < 0) return;

    if (framePointer > object.keyframePointer) {
      object.updateReference();
      object.keyframePointer++;
    }
    const keyframe = keyframes[framePointer];
    let percent = this.getTransformPercent(
      keyframes,
      framePointer,
      currentTime
    );
    keyframe.transformation(object, ...keyframe.params, percent);
  }

  update() {
    let currentTime = this.timer.howLong();
    this.updateScene(currentTime);
    this.scenes.forEach((scene) => {
      for (const object in scene) {
        if (!(scene[object] instanceof anim.obj)) continue;
        this.transformObject(scene[object], currentTime);
      }
    });
  }
}
