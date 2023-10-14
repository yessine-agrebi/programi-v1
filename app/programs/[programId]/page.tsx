"use client";
import API from "@/api/API";
import { AccordionCustomIcon } from "@/components/ui/AccordionCustomIcon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Exercise, ProgramData, Workout } from "@/lib/types";
import { fetcher } from "@/lib/utils";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Page({ params }: { params: { programId: number } }) {
  //convert to type object
  const { data, isLoading, error } = useSWR(`/workouts/program/${params.programId}`, fetcher);

  return (
    <div className="w-full h-full flex items-center justify-center my-5">
      {isLoading ? (
        <div>Loading...</div>
      ) : data as Workout[] ? (
        <div className="border mx-2 p-4 md:w-3/4 w-full h-full flex flex-col items-center justify-center rounded-lg shadow-md">
          {/* <h1 className="text-2xl font-bold mb-2">{program?.programName}</h1>
          <p className="mb-4">{program?.description}</p> */}
          <div className="flex flex-col gap-10 w-full">
            {data.map((workout : Workout) => {
              return (
                <Card key={workout.workoutId}>
                  <CardHeader>
                    <CardTitle>{workout.workoutName}</CardTitle>
                    <CardDescription>
                      {new Date(workout.date).toISOString().split("T")[0]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" color="blue" size="sm">
                      Open
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
}
