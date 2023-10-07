"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "My Programs", href: "/programs" },
    { name: "Exercises", href: "exercises" },
    { name: "Achievements", href: "/achievements" },
    { name: "Contact", href: "/contact" },
  ];

  function handleShow() {
    setShow(!show);
  }
  return (
    <nav className="bg-white dark:bg-gray-900 w-full top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="#" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Programi.tn
          </span>
        </Link>
        <div className="flex md:order-2">
          <Avatar className="md:ml-6 md:mt-0.5 md:mr-0">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={handleShow}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navigation.map((nav, index) => (
              <li key={index}>
                <Link
                  href={nav.href}
                  className="block py-2 pl-3 pr-4 text-black hover:text-blue-300"
                  aria-current="page"
                >
                  {nav.name}
                </Link>
              </li>
            ))}
            <Button
              variant="outline"
              size="lg"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Upgrade
            </Button>
          </ul>
        </div>
        {show && (
          <div
            className="items-center justify-between w-1/2 md:hidden"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navigation.map((nav, index) => (
                <li key={index}>
                  <Link
                    href={nav.href}
                    className="block py-2 pl-3 pr-4 text-black hover:text-blue-300"
                    aria-current="page"
                  >
                    {nav.name}
                  </Link>
                </li>
              ))}
              <Button
                variant="outline"
                size="lg"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Upgrade
              </Button>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
