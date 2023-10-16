import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { Exercise, Set } from "@/lib/types";

function Icon({ id, open }: { id: number; open: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function AccordionCustomIcon({
  open,
  exercise,
}: {
  open: number;
  exercise: Exercise;
}) {
  const [openAccordion, setOpenAccordion] = React.useState(0);
  const {data, isLoading, error} = useSWR(`/sets/exercise/${exercise.exerciseId}`, fetcher);

  const handleOpen = (value: number) =>
    setOpenAccordion(openAccordion === value ? 0 : value);

  return (
    <>
      <Accordion
        open={openAccordion === open}
        icon={<Icon id={openAccordion} open={open} />}
      >
        <AccordionHeader onClick={() => handleOpen(open)}>
          {exercise.exerciseName}
        </AccordionHeader>
        <AccordionBody>
          {isLoading ? (<div>Loading...</div>) : data ?(
            <Table className="w-full">
              <TableHead className="flex">
                <TableRow>
                  <TableHeader>Set</TableHeader>
                  <TableHeader>Reps</TableHeader>
                  <TableHeader>Weight</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((set: Set) => {
                  return (
                    <TableRow key={set.setId}>
                      <TableCell>{set.setNum}</TableCell>
                      <TableCell>{set.reps}</TableCell>
                      <TableCell>{set.weight}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ): (<div>{error}</div>)}
        </AccordionBody>
      </Accordion>
    </>
  );
}
