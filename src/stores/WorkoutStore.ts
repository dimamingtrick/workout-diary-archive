import { observable, action, toJS } from "mobx";
import uuid from "uuid";
import moment from "moment";
import { Workout, Exercise, SetWithDrop } from "../models/workout.model";

export default class WorkoutStore {
  timerInterval: any;
  @observable isRunning: boolean = false;
  @observable date: Date = new Date();
  @observable timer: string = "00:00:00";
  @observable currentExercise: Exercise | null = null;
  @observable exercises: Array<Exercise> = [];
  @observable openExercises: Array<number> = [];

  @action startWorkout() {
    this.isRunning = true;
    this.date = new Date();
    this.timerInterval = setInterval(() => {
      this.timer = moment(this.timer, "HH:mm:ss")
        .add(1, "seconds")
        .format("HH:mm:ss");
    }, 1000);
  }

  @action stopWorkout() {
    this.isRunning = false;
    this.exercises = [];
    this.timer = "00:00:00";
    this.openExercises = [];
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

  @action addSet({ weight, reps, comment, dropSets }: SetWithDrop) {
    this.currentExercise!.sets.push({
      id: uuid(),
      weight,
      reps,
      comment,
      dropSets
    });
    document.querySelector(".current-exercise-page")?.scrollTo({
      top: 10000,
      behavior: "smooth"
    });
  }

  @action editSet(id: string, set: SetWithDrop) {
    const selectedExercise = this.currentExercise!.sets.find(
      set => set.id === id
    );
    if (this.currentExercise && selectedExercise) {
      this.currentExercise.sets = this.currentExercise.sets.map(
        (i: SetWithDrop) => {
          if (i.id === id) {
            i = set;
          }
          return i;
        }
      );
    }
  }

  @action deleteSet(deletedSet: SetWithDrop) {
    this.currentExercise!.sets = this.currentExercise!.sets.filter(
      set => set.id !== deletedSet.id!
    );
  }

  @action completeExercise() {
    if (!this.currentExercise || !this.currentExercise.name) return;

    if (!this.currentExercise.id) {
      this.exercises.push({
        id: uuid(),
        ...this.currentExercise
      });
      this.openExercises.push(this.exercises.length);
    } else {
      this.exercises = this.exercises.map((exercise: Exercise) => {
        if (exercise.id === this.currentExercise!.id) {
          exercise = this.currentExercise!;
        }
        return exercise;
      });
    }

    this.currentExercise = null;
  }

  @action cancelExercise() {
    this.currentExercise = null;
  }

  @action editExercise(exercise: Exercise) {
    this.currentExercise = exercise;
  }

  @action deleteExercise(deletedExercise: Exercise) {
    this.exercises = this.exercises.filter(
      exercise => exercise.id !== deletedExercise.id
    );
  }

  @action toggleOpenExercise({
    number,
    isOpen
  }: {
    number: number;
    isOpen: boolean;
  }) {
    if (isOpen) {
      this.openExercises.push(number);
    } else {
      this.openExercises = this.openExercises.filter(i => i !== number);
    }
  }

  @action finishWorkout() {
    if (
      !this.isRunning ||
      !this.exercises ||
      this.exercises.length === 0 ||
      !!this.currentExercise
    ) {
      return;
    }

    this.stopWorkout();
    const workout: Workout = {
      date: this.date,
      timer: this.timer,
      exercises: toJS(this.exercises)
    };
    console.log(workout);
  }
}
