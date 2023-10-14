import API from "@/api/API";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: string) =>
  API.get(url).then((res) => {
    console.log(res.data);
    return res.data;
  });
