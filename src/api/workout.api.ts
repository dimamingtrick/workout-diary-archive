import api from "./api";

// import { SignUpInterface, SignInInterface } from "../models/auth.model";
import { Workout } from "../models/workout.model";

export const finishWorkout = (workout: Workout) => api.post("workout/finish", workout);