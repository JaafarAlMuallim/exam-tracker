"use client";
import Data from "@/model/Data";
import { convertTimeTo24HourFormat, sortByDateAndTime } from "@/utils/utils";
import { useCallback } from "react";
import Actions from "./Actions";

export default function PinnedTable({
  data,
  onDelete,
}: {
  data: Data[];
  onDelete: (courseId: string) => void;
}) {
  if (data.length === 0) {
    return (
      <div
        id="schedule"
        className="text-white flex flex-col items-center justify-center"
      >
        <h1 className="text-4xl font-bold text-center mb-5">Added Courses</h1>
        <h1 className="text-2xl font-bold text-center md:mb-5">
          Added Courses Will Show Here
        </h1>
      </div>
    );
  }
  return (
    <div id="schedule" className="flex flex-col items-center justify-center">
      <h1 className="text-white text-4xl font-bold text-center mb-5">
        Pinned Courses
      </h1>
      <table
        id="pinned"
        className="table-fixed border-2 border-gray-300 rounded-md p-2 text-center text-white md:table-auto"
      >
        <thead>
          <tr>
            <th className={`bg-gray-200 bg-opacity-40 border px-4 py-2`}>
              Course ID
            </th>
            <th
              className={`hidden bg-gray-200 bg-opacity-40 border px-4 py-2 md:table-cell`}
            >
              Time
            </th>
            <th className={`bg-gray-200 bg-opacity-40 border px-4 py-2`}>
              Date
            </th>
            <th
              className={`hidden bg-gray-200 bg-opacity-40 border px-4 py-2 md:table-cell`}
            >
              Day
            </th>
            <th
              className={`hidden bg-gray-200 bg-opacity-40 border px-4 py-2 md:table-cell`}
            >
              Location
            </th>
            <th className={`bg-gray-200 bg-opacity-40 border px-4 py-2`}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data
            .sort((a, b) => {
              const aTime = convertTimeTo24HourFormat(a.time);
              const bTime = convertTimeTo24HourFormat(b.time);
              const dateA = new Date(`${a.date} ${aTime}`);
              const dateB = new Date(`${b.date} ${bTime}`);

              if (dateA > dateB) return 1;
              if (dateA < dateB) return -1;
              return 0;
            })
            .map((item, idx) => {
              let classes =
                idx % 2 === 0
                  ? "bg-gray-400 bg-opacity-40"
                  : "bg-gray-200 bg-opacity-40";
              return (
                <tr key={item.courseId}>
                  <td className={`text-center border px-4 py-2 ${classes}`}>
                    {item.courseId}
                  </td>
                  <td
                    className={`hidden text-center border px-4 py-2 ${classes} md:table-cell`}
                  >
                    {convertTimeTo24HourFormat(item.time)}
                  </td>
                  <td className={`text-center border px-4 py-2 ${classes}`}>
                    {item.date}
                  </td>
                  <td
                    className={`hidden text-center border px-4 py-2 ${classes} md:table-cell`}
                  >
                    {item.day}
                  </td>
                  <td
                    className={`hidden text-center border px-4 py-2 ${classes} md:table-cell`}
                  >
                    {item.location}
                  </td>
                  <td className={`text-center border px-4 py-2 ${classes}`}>
                    <button
                      onClick={() => onDelete(item.courseId)}
                      className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Actions data={data} />
    </div>
  );
}
