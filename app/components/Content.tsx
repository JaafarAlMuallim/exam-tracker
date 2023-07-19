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
  const pinCourse = () => {
    if (shownData.length !== 1) {
      alert("Please search for a course first");
      return;
    }
    setPinnedData((pinnedData) =>
      sortByDateAndTime([...pinnedData, shownData[0]])
    );
    localStorage.setItem(
      "pinnedData",
      JSON.stringify([...pinnedData, shownData[0]])
    );
    setShownData((shownData) =>
      sortByDateAndTime(
        shownData.filter((item) => item.courseId !== shownData[0].courseId)
      )
    );
    return;
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
  const downloadSchedule = (fileType: string) => {
    switch (fileType) {
      case "txt":
        let text = "";
        pinnedData.forEach((item) => {
          text += `${item.courseId} ${item.time} ${item.date} ${item.day} ${item.location}\n`;
        });
        const element = document.createElement("a");
        const txt = new Blob([text], { type: "text/plain" });
        element.href = URL.createObjectURL(txt);
        element.download = "schedule.txt";
        document.body.appendChild(element);
        element.click();
        break;
      case "csv":
        // write the schedule in csv format and download it
        const csvRows = [];
        const headers = Object.keys(pinnedData[0]);
        csvRows.push(headers.join(","));
        for (const row of pinnedData) {
          const values = Object.values(row);
          csvRows.push(values.join(","));
        }
        const csvData = csvRows.join("\n");
        const csv = new Blob([csvData], { type: "text/csv" });
        const anchor = document.createElement("a");
        anchor.href = URL.createObjectURL(csv);
        anchor.download = "schedule.csv";
        document.body.appendChild(anchor);
        anchor.click();
        break;
      case "xlsx":
        // write the schedule in xlsx format and download it
        let excelData = "";
        pinnedData.forEach((item, idx) => {
          if (idx === 0) {
            Object.keys(item).forEach((key) => {
              excelData += `${key},`;
            });
            excelData += "\r\n";
          } else {
            Object.values(item).forEach((value) => {
              excelData += `${value},`;
            });
            excelData += "\r\n";
          }
        });
        excelData = "data:text/xlsx," + encodeURI(excelData);
        let a = document.createElement("A");
        a.setAttribute("href", excelData);
        a.setAttribute("download", "filename.xlsx");
        document.body.appendChild(a);
        a.click();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <PinnedTable data={pinnedData} onDelete={onDelete} />
      <Filters courseCodeRef={ref} handleCourseName={handler} />
      <div className="flex items-center justify-center m-auto">
        <button
          onClick={pinCourse}
          className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full mb-5 mr-5"
        >
          Pin Searched Course
        </button>
        <button
          onClick={() => downloadSchedule("xlsx")}
          className={`bg-blue-500 inline-flex hover:bg-blue-700 ${
            pinnedData.length === 0 ? "bg-gray-600 hover:bg-gray-800" : ""
          } text-white font-bold py-2 px-4 rounded-full mb-5`}
          disabled={pinnedData.length === 0}
        >
          Download Schedule (txt file format)
        </button>
      </div>
      <button
        onClick={toggle}
        className={`bg-blue-500 inline-flex hover:bg-blue-700text-white font-bold py-2 px-4 rounded-full mb-5`}
      >
        Show All Exams
      </button>

      {showTable && (
        <table
          id="table"
          className="border-2 border-gray-300 rounded-md p-2 text-center text-white lg:w-80"
        >
          <thead className="bg-gray-200 bg-opacity-40 border px-4 py-2">
            <tr>
              <th className={`bg-gray-200 bg-opacity-40 border px-4 py-2`}>
                Course ID
              </th>
              <th className={`bg-gray-200 bg-opacity-40 border px-4 py-2`}>
                Time
              </th>
              <th className={`bg-gray-200 bg-opacity-40 border px-4 py-2`}>
                Date
              </th>
              <th className={`bg-gray-200 bg-opacity-40 border px-4 py-2`}>
                Day
              </th>
              <th className={`bg-gray-200 bg-opacity-40 border px-4 py-2`}>
                Location
              </th>
              <th className={`bg-gray-200 bg-opacity-40 border px-4 py-2`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortByDateAndTime(shownData).map((item, idx) => {
              let classes =
                idx % 2 === 0
                  ? "bg-gray-400 bg-opacity-40"
                  : "bg-gray-200 bg-opacity-40";
              return (
                <tr key={item.courseId}>
                  <td
                    className={`text-center border px-4 py-2 ${classes} whitespace-nowrap`}
                  >
                    {formatString(item.courseId)}
                  </td>
                  <td
                    className={`text-center border px-4 py-2 ${classes} whitespace-nowrap`}
                  >
                    {convertTimeTo24HourFormat(item.time)}
                  </td>
                  <td
                    className={`text-center border px-4 py-2 ${classes} whitespace-nowrap`}
                  >
                    {item.date}
                  </td>
                  <td
                    className={`text-center border px-4 py-2 ${classes} whitespace-nowrap`}
                  >
                    {item.day}
                  </td>
                  <td
                    className={`text-center border px-4 py-2 ${classes} whitespace-nowrap`}
                  >
                    {item.location}
                  </td>
                  <td
                    className={`text-center border px-4 py-2 ${classes} whitespace-nowrap`}
                  >
                    <button
                      onClick={() => addCourse(item.courseId)}
                      className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Add
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
