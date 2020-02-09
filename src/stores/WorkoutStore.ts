import { observable, action } from "mobx";

import { Workout, Exercise, Set } from "../models/workout.model";

export default class WorkoutStore {
  timerInterval: any;
  @observable isRunning: boolean = false;
  @observable date: Date = new Date();
  @observable timer: number = 0;
  @observable currentExercise: Exercise | null = null;
  @observable exercises: Array<Exercise> = [];

  @action startWorkout() {
    this.isRunning = true;
    this.date = new Date();
    this.currentExercise = {
      name: "",
      sets: []
    }
    this.timerInterval = setInterval(() => {
      this.timer = this.timer + 1;
    }, 1000);
  }

  @action stopWorkout() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
  }

  @action startNewExercise() {
    this.currentExercise = {
      name: "",
      sets: []
    };
  }

  @action setExerciseName(name: string) {
    if (this.currentExercise) {
      this.currentExercise.name = name;
    }
  }

  @action addSet(
    weight: number,
    reps: number,
    comment?: string,
    dropSets?: Array<Set>
  ) {
    this.currentExercise!.sets.push({ weight, reps, comment, dropSets });
  }

  @action completeExercise() {
    if (this.currentExercise) {
      this.exercises.push(this.currentExercise);
      this.currentExercise = null;
    }
  }

  @action cancelExercise() {
    this.currentExercise = null;
  }

  @action finishWorkout() {
    this.stopWorkout();
    const workout: Workout = {
      date: this.date,
      timer: this.timer,
      exercises: this.exercises
    };
    console.log(workout);
  }
}
