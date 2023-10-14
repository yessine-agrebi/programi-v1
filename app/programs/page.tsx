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
import { Program } from "@/lib/types";
import API from "@/api/API";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import useSWR from "swr";
const formSchema = z.object({
  programName: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  userId: z.number(),
});

const Programs = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const fetcher = (url: string) =>
    API.get(url).then((res) => {
      console.log(res.data);
      return res.data;
    });
    
  const { data, isLoading, error } = useSWR("/programs", fetcher);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      programName: "",
      description: "",
      startDate: "",
      endDate: "",
      userId: 1,
    },
  });

  function displayForm() {
    setIsDisplayed(!isDisplayed);
  }

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const startdate: Date = new Date(values.startDate);
    const enddate: Date = new Date(values.endDate);
    const userId = 1;
    console.log({ ...values, userId, startDate: startdate, endDate: enddate });
    API.post("/programs", {
      ...values,
      userId,
      startDate: startdate,
      endDate: enddate,
    })
      .then((res) => console.log("program created", res.data))
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
        Create a Program
      </Button>
      {isDisplayed && (
        <div className="mt-5 max-w-screen-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="programName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your program name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your program description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Select Start date"
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Select End date"
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create</Button>
            </form>
          </Form>
        </div>
      )}
      <div className="mt-5 grid md:grid-cols-3 gap-4">
        {isLoading ? <div>Loading....</div> : (data ? data.map((program: Program) => (
          <Card key={program.programId} className="">
            <CardHeader>
              <CardTitle>{program.programName}</CardTitle>
              <CardDescription>{program.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Start: {new Date(program.startDate).toISOString().split("T")[0]}{" "}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col justify-start items-start gap-4">
              <p>
                End: {new Date(program.endDate).toISOString().split("T")[0]}
              </p>

              <Link href={`/programs/${encodeURIComponent(program.programId)}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  View Program
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )): <div>{error}</div>)}
      </div>
    </div>
  );
};

export default Programs;
