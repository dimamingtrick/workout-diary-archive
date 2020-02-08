import { observable, action } from "mobx"

interface CurrentExercise {
  login?: string;
  email?: string;
  avatar?: string;
}

export default class WorkoutStore {
  @observable isRunning: boolean = false;
  @observable timer: number = 0;
  timerInterval: any;

  @action startWorkout() {
    this.isRunning = true;
    this.timerInterval = setInterval(() => {
      this.timer = this.timer + 1;
    }, 1000)
  }

  @action stopWorkout() {
    this.isRunning = false;
    clearInterval(this.timerInterval)
  }
}
