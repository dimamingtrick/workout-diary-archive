import { observable, action } from "mobx"

import { getWorkoutHistory } from "../api/workout.api";
import { Workout } from "../models/workout.model";

export default class WorkoutHistoryStore {
  @observable isLoading: boolean = false;
  @observable workouts: Array<Workout> = [];

  @action async getWorkoutHistory() {
    try {
      const workouts = await getWorkoutHistory();
      this.workouts = workouts;
    } catch (err) {
      console.log("Get workout history err: ", err);
    }
  }
}
