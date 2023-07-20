import Data from "@/model/Data";
import {
  convertTimeTo24HourFormat,
  formatString,
  sortByDateAndTime,
} from "@/utils/utils";

export default function AllTable({
  shownData,
  addCourse,
  pinnedData,
}: {
  shownData: Data[];
  addCourse: (courseId: string) => void;
  pinnedData: Data[];
}) {
  const filteredData = [];
  for (const entry of shownData) {
    if (!pinnedData.some((element) => element.courseId === entry.courseId)) {
      filteredData.push(entry);
    }
  }
  return (
    <table
      id="all"
      className="md:my-5 border-2 border-gray-300 rounded-md p-2 text-center text-white lg:w-80"
    >
      <thead className="bg-gray-200 bg-opacity-40 border px-4 py-2">
        <tr>
          <th className={`bg-gray-200 bg-opacity-40 border px-4 py-2`}>
            Course ID
          </th>
          <th
            className={`hidden bg-gray-200 bg-opacity-40 border md:table-cell md:px-4 md:py-2`}
          >
            Time
          </th>
          <th
            className={`hidden bg-gray-200 bg-opacity-40 border md:table-cell md:px-4 md:py-2`}
          >
            Date
          </th>
          <th
            className={`hidden bg-gray-200 bg-opacity-40 border md:table-cell md:px-4 md:py-2`}
          >
            Day
          </th>
          <th
            className={`hidden bg-gray-200 bg-opacity-40 border md:table-cell md:px-4 md:py-2`}
          >
            Location
          </th>
          <th className={`bg-gray-200 bg-opacity-40 border md:px-4 md:py-2`}>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {sortByDateAndTime(filteredData).map((item, idx) => {
          let classes =
            idx % 2 === 0
              ? "bg-gray-400 bg-opacity-40"
              : "bg-gray-200 bg-opacity-40";
          return (
            <tr key={idx}>
              <td
                className={`text-center border md:px-4 md:py-2 ${classes} whitespace-nowrap`}
              >
                {formatString(item.courseId)}
              </td>
              <td
                className={`hidden text-center border md:table-cell md:px-4 md:py-2 ${classes} whitespace-nowrap`}
              >
                {convertTimeTo24HourFormat(item.time)}
              </td>
              <td
                className={`hidden text-center border md:table-cell md:px-4 md:py-2 ${classes} whitespace-nowrap`}
              >
                {item.date}
              </td>
              <td
                className={`hidden text-center border md:table-cell md:px-4 md:py-2 ${classes} whitespace-nowrap`}
              >
                {item.day}
              </td>
              <td
                className={`hidden text-center border md:table-cell md:px-4 md:py-2 ${classes} whitespace-nowrap`}
              >
                {item.location}
              </td>
              <td
                className={`text-center border md:px-4 md:py-2 ${classes} whitespace-nowrap`}
              >
                <button
                  onClick={() => addCourse(item.courseId)}
                  className="bg-blue-700 hover:bg-blue-900 h-8 w-20 my-5 mx-10 rounded-md text-white md:h-auto md:w-auto md:text-center md:font-bold md:py-2 md:px-4 md:rounded-full"
                >
                  Add
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
