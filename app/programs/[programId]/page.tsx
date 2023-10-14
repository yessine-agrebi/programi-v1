"use client";
import API from "@/api/API";
import { AccordionCustomIcon } from "@/components/ui/AccordionCustomIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Exercise, ProgramData, Workout } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { programId: number } }) {
  //convert to type object

  const [program, setProgram] = useState<ProgramData>();

  useEffect(() => {
    API.get<ProgramData>(`/programs/workouts/${params.programId}`)
      .then((res) => {
        console.log(res.data);
        setProgram(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center my-5">
      <div className="border mx-2 p-4 md:w-3/4 w-full h-full flex flex-col items-center justify-center rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2">{program?.programName}</h1>
        <p className="mb-4">{program?.description}</p>
        <div className="flex flex-col gap-10 w-full">
          {program?.workouts.map((workout, index) => {
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{workout.workoutName}</CardTitle>
                  <CardDescription>{new Date(program.endDate).toISOString().split("T")[0]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" color="blue" size="sm">Open</Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
