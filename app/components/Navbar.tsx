"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
export default function Navbar() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.15 }}
      >
        <nav
          style={{ backgroundColor: "#121826" }}
          className="fixed md:w-full z-20 top-0 left-0  border-gray-200"
        >
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" className="flex items-center">
              <span className="ml-3 text-white text-2xl whitespace-nowrap">
                KFUPM Exam Tracker
              </span>
            </a>
            <div className="mx-10 flex order-2 md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger className="">
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                    color="white"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="absolute h-auto w-full right-0 whitespace-nowrap">
                  <DropdownMenuItem>
                    <a href="/" className="relative">
                      Home
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#schedule" className="relative">
                      Pinned Schedule
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#all" className="relative">
                      All Courses
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="#footer" className="relative">
                      Contact
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div
              style={{ backgroundColor: "#121826" }}
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="/"
                    className="block py-2 pl-3 pr-4 text-white hover:text-slate-600 rounded md:bg-transparent md:p-0"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#schedule"
                    className="block text-white py-2 pl-3 pr-4 rounded hover:text-slate-600  md:p-0 "
                  >
                    Pinned Schedule
                  </a>
                </li>
                <li>
                  <a
                    href="#all"
                    className="block text-white py-2 pl-3 pr-4 rounded hover:text-slate-600  md:p-0 "
                  >
                    All Courses
                  </a>
                </li>
                <li>
                  <a
                    href="#footer"
                    className="block text-white py-2 pl-3 pr-4 rounded hover:text-slate-600 md:p-0 "
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </motion.div>
    </AnimatePresence>
  );
}
