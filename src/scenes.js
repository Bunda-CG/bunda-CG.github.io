import * as anim from "./helperTools/animation.js";
import * as fn from "./function.js";

export class Scene {
  preventStart(startAt, object) {
    if (object.keyframes.length < 1 && startAt > 0) {
      object.addKeyframe(startAt, anim.stay, fn.LINEAR);
    }
  }

  makeAnimate() {}
}
