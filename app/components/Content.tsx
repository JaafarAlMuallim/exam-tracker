"use client";
import Data from "@/model/Data";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Filters from "./Filters";
import PinnedTable from "./PinnedTable";
import {
  convertTimeTo24HourFormat,
  formatString,
  sortByDateAndTime,
} from "@/utils/utils";
import AllTable from "./AllTable";

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
      })
    );
  };

  const onDelete = (courseId: string) => {
    setPinnedData((pinnedData) =>
      sortByDateAndTime(pinnedData.filter((item) => item.courseId !== courseId))
    );
    localStorage.setItem(
      "pinnedData",
      JSON.stringify(pinnedData.filter((item) => item.courseId !== courseId))
    );
    const list = [
      pinnedData.filter((item) => item.courseId === courseId)[0],
      ...shownData,
    ];
    const sorted = sortByDateAndTime(list);
    setShownData((shownData) => sorted);
  };
  const addCourse = (courseId: string) => {
    const list = [
      shownData.filter((item) => item.courseId === courseId)[0],
      ...pinnedData,
    ];
    const sorted = sortByDateAndTime(list);
    setPinnedData((pinnedData) => sorted);
    localStorage.setItem(
      "pinnedData",
      JSON.stringify([
        shownData.filter((item) => item.courseId === courseId)[0],
        ...pinnedData,
      ])
    );
    setShownData((shownData) =>
      sortByDateAndTime(shownData.filter((item) => item.courseId !== courseId))
    );

    return;
  };

  const toggle = () => {
    setShowTable((prevState) => !prevState);
  };

  return (
    <>
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
    </>
  );
}
