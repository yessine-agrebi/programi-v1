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
  
  