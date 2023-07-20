"use client";
import Data from "@/model/Data";
import { sortByDateAndTime } from "@/utils/utils";
import { useCallback } from "react";
import XLSX from "xlsx";
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
        id="pinned"
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
    <div id="pinned" className="flex flex-col items-center justify-center">
      <h1 className="text-white text-4xl font-bold text-center mb-5">
        Pinned Courses
      </h1>
      <table className="table-fixed border-2 border-gray-300 rounded-md p-2 text-center text-white md:table-auto">
        <thead>
          <tr>
            <th className={`bg-gray-200 bg-opacity-40 border px-4 py-2`}>
              Course Name
            </th>
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
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {sortByDateAndTime(data).map((item, idx) => {
            let classes =
              idx % 2 === 0
                ? "bg-gray-400 bg-opacity-40"
                : "bg-gray-200 bg-opacity-40";
            return (
              <tr key={item.courseId}>
                <td className={`text-center border px-4 py-2 ${classes}`}>
                  {item.courseName}
                </td>
                <td className={`text-center border px-4 py-2 ${classes}`}>
                  {item.courseId}
                </td>
                <td className={`text-center border px-4 py-2 ${classes}`}>
                  {item.time}
                </td>
                <td className={`text-center border px-4 py-2 ${classes}`}>
                  {item.date}
                </td>
                <td className={`text-center border px-4 py-2 ${classes}`}>
                  {item.day}
                </td>
                <td className={`text-center border px-4 py-2 ${classes}`}>
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
