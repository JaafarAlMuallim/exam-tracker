"use client";
import Data from "@/model/Data";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Filters from "./Filters";
import PinnedTable from "./PinnedTable";
import AllTable from "./AllTable";
import { AnimatePresence, motion } from "framer-motion";
import {
  convertTimeTo24HourFormat,
  sortByDateAndTime,
} from "@/utilites/miscFunctions";
export default function Content({ data }: { data: Data[] }) {
  const [shownData, setShownData] = useState<Data[]>(data);
  const [pinnedData, setPinnedData] = useState<Data[]>([]);
  const [showTable, setShowTable] = useState<boolean>(true);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const pinned = localStorage.getItem("pinnedData");
    if (pinned) {
      setPinnedData(JSON.parse(pinned));
    }
  }, []);
  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    setShownData((shownData) =>
      data.filter((item) => {
        if (!ref.current?.value) {
          return true;
        }
        if (item.courseId.includes(ref.current?.value!.toUpperCase()!)) {
          return true;
        }
      }),
    );
  };

  const onDelete = (courseId: string) => {
    setPinnedData((pinnedData) =>
      sortByDateAndTime(
        pinnedData.filter((item) => item.courseId !== courseId),
      ),
    );
    localStorage.setItem(
      "pinnedData",
      JSON.stringify(pinnedData.filter((item) => item.courseId !== courseId)),
    );
    ref.current!.value = "";
    setShownData((shownData) =>
      // all data except in pinned
      data.filter((item) => !pinnedData.includes(item)),
    );
  };
  const addCourse = (courseId: string) => {
    const list = [
      shownData.filter((item) => item.courseId === courseId)[0],
      ...pinnedData,
    ];
    ref.current!.value = "";
    setShownData((shownData) =>
      // all data except in pinned
      data.filter((item) => !pinnedData.includes(item)),
    );
    list.sort((a, b) => {
      const aTime = convertTimeTo24HourFormat(a.time);
      const bTime = convertTimeTo24HourFormat(b.time);
      const dateA = new Date(`${a.date} ${aTime}`);
      const dateB = new Date(`${b.date} ${bTime}`);

      if (dateA > dateB) return 1;
      if (dateA < dateB) return -1;
      return 0;
    });
    setPinnedData((pinnedData) => list);
    localStorage.setItem(
      "pinnedData",
      JSON.stringify([
        shownData.filter((item) => item.courseId === courseId)[0],
        ...pinnedData,
      ]),
    );
    setShownData((shownData) =>
      sortByDateAndTime(shownData.filter((item) => item.courseId !== courseId)),
    );

    return;
  };

  const toggle = () => {
    setShowTable((prevState) => !prevState);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.3 }}
        >
          <PinnedTable data={pinnedData} onDelete={onDelete} />
          <Filters
            courseCodeRef={ref}
            handleCourseName={handler}
            toggle={toggle}
            showTable={showTable}
          />
          <div className="flex items-center justify-center m-auto"></div>
          {showTable && (
            <AllTable
              addCourse={addCourse}
              shownData={shownData}
              pinnedData={pinnedData}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
