import { createContext } from 'react';

import AuthStore from "./AuthStore";
import WorkoutStore from "./WorkoutStore";
import WorkoutHistoryStore from "./WorkoutHistoryStore";

export const storesContext = createContext({
  AuthStore: new AuthStore(),
  WorkoutStore: new WorkoutStore(),
  WorkoutHistoryStore: new WorkoutHistoryStore()
});
