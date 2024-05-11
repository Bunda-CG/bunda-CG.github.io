export class Timer {
  constructor() {
    this.comulativeTime = 0;
    this.timePoint = new Date().getTime();
    this.isRunning = false;
  }
  start() {
    if (this.isRunning) return;
    this.timePoint = new Date().getTime();
    this.isRunning = true;
  }
  stop() {
    if (!this.isRunning) return;
    const endTime = new Date().getTime();
    this.comulativeTime += endTime - this.timePoint;
    this.isRunning = false;
  }
  reset() {
    this.comulativeTime = 0;
    this.timePoint = new Date().getTime();
    this.isRunning = false;
  }
  howLong() {
    if (this.isRunning) {
      const endTime = new Date().getTime();
      return this.comulativeTime + endTime - this.timePoint;
    } else {
      return this.comulativeTime;
    }
  }
}

export function toSecond(timeInMS) {
  return (timeInMS / 1000).toFixed(0);
}
