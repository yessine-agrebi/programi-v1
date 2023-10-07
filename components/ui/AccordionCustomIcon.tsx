import React, { useEffect } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Exercise, GroupedSet, Set } from "@/lib/types";
import API from "@/api/API";
import { Table, TableBody, TableCell, TableHead, TableRow } from "./table";

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
  workout,
}: {
  open: number;
  workout: Exercise;
}) {
  const [openAccordion, setOpenAccordion] = React.useState(0);
  const [groupedSets, setGroupedSets] = React.useState<GroupedSet[]>([]);

  useEffect(() => {
    API.get<GroupedSet[]>(`/sets/exercise/${workout.exerciseId}`)
      .then((res) => {
        setGroupedSets(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOpen = (value: number) =>
    setOpenAccordion(openAccordion === value ? 0 : value);

  return (
    <>
      <Accordion
        open={openAccordion === open}
        icon={<Icon id={openAccordion} open={open} />}
      >
        <AccordionHeader onClick={() => handleOpen(open)}>
          {workout.exerciseName}
        </AccordionHeader>
        <AccordionBody>
          <TableBody>
            {groupedSets?.map((group: GroupedSet) => (
              <>
                <TableHead key={group.date}>{group.date}</TableHead>
                {group.sets.map((set: Set) => (
                  <TableRow key={set.setId}>
                    <TableCell>{set.setNum}</TableCell>
                    <TableCell>{set.reps}</TableCell>
                    <TableCell>{set.weight}</TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </AccordionBody>
      </Accordion>
    </>
  );
}
