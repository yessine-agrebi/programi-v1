

export interface Program {
    programId: number
    programName: string
    description: string
    startDate: Date
    endDate: Date
    userId: number
}


export interface Exercise {
  exerciseId: number;
  exerciseName: string;
  bodyPart: string;
  equipment: string;
}

export interface Workout {
  workoutId: number;
  date: string;
  workoutName: string;
}

export interface ProgramData {
  programId: number;
  programName: string;
  description: string;
  startDate: string;
  endDate: string;
  workouts: {
    date: string;
    workoutName: string;
    workoutId: number;
    workouts: Workout[];
  }[];
}




export interface Set {
    setId: number
    weight: number
    reps: number
    setNum: number
    isBestSet: boolean
}

export interface GroupedSet {
  date: string
  sets: Set[]
}
  
  