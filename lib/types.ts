export interface Exercise {
    exerciseId: number
    exerciseName: string
    bodyPart: string
    equipment: string
    date?: string
}

export interface Program {
    programId: number
    programName: string
    description: string
    startDate: Date
    endDate: Date
    userId: number
}


export interface ProgramData {
    program: {
      programName: string;
      description: string;
    };
    exercises: {
      exerciseId: number;
      exerciseName: string;
      bodyPart: string;
      equipment: string;
      date: string; // Assuming date is in string format
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
  
  