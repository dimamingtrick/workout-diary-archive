export interface Set {
  id?: string;
  weight: number;
  reps: number;
  comment?: string;
}

export interface SetWithDrop extends Set {
  dropSets?: Array<Set>
}

export interface Exercise {
  id?: string;
  name: string;
  sets: Array<SetWithDrop>
}

export interface Workout {
  date: Date;
  timer: string; // Not sure about this type yet
  exercises: Array<Exercise>;
}