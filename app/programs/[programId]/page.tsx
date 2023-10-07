'use client';
import API from "@/api/API";
import { ProgramData } from "@/lib/types";
import { useEffect, useState } from "react";

 
export default function Page({
  params,
}: {
  params: { programId: number };
}) {

  const [program, setProgram] = useState<ProgramData[]>([])

  const image = new FormData();
  image.append("image", "image");

  useEffect(() => {
    API.get<ProgramData[]>(`/programs/workouts/${params.programId}`)
      .then((res) => {
        console.log(res.data);
        setProgram(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    program?.map((program) => (
        <div>
          <h1>{program.program.programName} </h1>
          <p>{program.program.description}</p>
          <ul>
            {program.exercises.map((workout, index) => (
              <li key={workout.exerciseId}>{workout.exerciseName}</li>
            ))}
          </ul>
        </div>
      ))
  )
}