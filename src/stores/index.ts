import { createContext } from 'react';

import AuthStore from "./AuthStore";
import WorkoutStore from "./WorkoutStore";

export const storesContext = createContext({
  AuthStore: new AuthStore(),
  WorkoutStore: new WorkoutStore()
});
