export interface Set {
  weight: number;
  reps: number;
  comment?: string;
}

export interface SetWithDrop extends Set {
  dropSets?: Array<Set>
}

export interface Exercise {
  name: string;
  sets: Array<SetWithDrop>
}

export interface Workout {
  date: Date;
  timer: string | Date | number; // Not sure about this type yet
  exercises: Array<Exercise>;
}