"use client";
import { AccordionCustomIcon } from "@/components/ui/AccordionCustomIcon";
import { Exercise } from "@/lib/types";
import { fetcher } from "@/lib/utils";
import React from "react";
import useSWR from "swr";

const page = ({ params }: { params: { workoutId: number } }) => {
  console.log(params.workoutId);
  const { data, isLoading, error } = useSWR(
    `/exercises/workout/${params.workoutId}`,
    fetcher
  );
  return isLoading ? (
    <div>Loading...</div>
  ) : data ? (
    <div className="mt-4">
      {data.map((exercise: Exercise) => {
        return (
          <div className="flex flex-col gap-5 w-full md:justify-center md:items-center">
            <AccordionCustomIcon
              key={exercise.exerciseId}
              open={exercise.exerciseId}
              exercise={exercise}
            />
          </div>
        );
      })}
    </div>
  ) : (
    <div>{error}</div>
  );
};

export default page;
