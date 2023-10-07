"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import API from "@/api/API";
import { Exercise } from "@/lib/types";

const formSchema = z.object({
  exerciseName: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  bodyPart: z.string(),
  equipment: z.string(),
  userId: z.number(),
});

const Exercises = () => {
  const [isDispalyed, setIsDisplayed] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    API.get<Exercise[]>("/exercises")
      .then((res) => {
        console.log(res.data);
        setExercises(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exerciseName: "",
      bodyPart: "",
      equipment: "",
      userId: 1,
    },
  });

  function displayForm() {
    setIsDisplayed(!isDispalyed);
  }

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const userId = 1;
    API.post("/exercises", { ...values, userId })
    .then((res) => console.log("exercise created", res.data))
    .catch((err) => console.log(err));
  }
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <Button
        variant="outline"
        size="lg"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={displayForm}
      >
        Create an Exercise
      </Button>
      {isDispalyed && (
        <div className="mt-5 max-w-screen-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="exerciseName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exercise Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your exercise name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bodyPart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body Part</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a BodyPart to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Chest">Chest</SelectItem>
                        <SelectItem value="Back">Back</SelectItem>
                        <SelectItem value="Legs">Legs</SelectItem>
                        <SelectItem value="Shoulders">Shoulders</SelectItem>
                        <SelectItem value="Biceps">Biceps</SelectItem>
                        <SelectItem value="Triceps">Triceps</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="equipment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipment</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an Equipement to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Dumbbell">Dumbbell</SelectItem>
                        <SelectItem value="Bar">Bar</SelectItem>
                        <SelectItem value="Cable">Cable</SelectItem>
                        <SelectItem value="Body Weight">Body Weight</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button type="submit">Create</Button>
            </form>
          </Form>
        </div>
      )}
      <div className="mt-4">
        <Table>
          <TableCaption>A list of your Exercises</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Body Part</TableHead>
              <TableHead>Equipement</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exercises?.map((exercise: Exercise) => (
              <TableRow key={exercise.exerciseId}>
              <TableCell>{exercise.exerciseName}</TableCell>
              <TableCell>{exercise.bodyPart}</TableCell>
              <TableCell>{exercise.equipment}</TableCell>
              <TableCell className="text-right">Button</TableCell>
            </TableRow>
            ))}
            
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Exercises;
