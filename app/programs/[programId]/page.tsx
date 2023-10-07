"use client";
import API from "@/api/API";
import { AccordionCustomIcon } from "@/components/ui/AccordionCustomIcon";
import { ProgramData } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { programId: number } }) {
  const [program, setProgram] = useState<ProgramData[]>([]);

  useEffect(() => {
    API.get<ProgramData[]>(`/programs/workouts/${params.programId}`)
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
      {program?.map((program) => (
        <div className="border mx-2 p-4 md:w-3/4 w-full h-full flex flex-col items-center justify-center rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-2">
            {program.program.programName}
          </h1>
          <p className="mb-4">{program.program.description}</p>
          <div className="flex flex-col gap-10 w-full">
            {program.exercises.map((workout, index) => (
              <AccordionCustomIcon
                key={index}
                open={index + 1}
                workout={workout}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
