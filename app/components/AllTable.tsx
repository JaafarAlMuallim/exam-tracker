import Data from "@/model/Data";
import {
  convertTimeTo24HourFormat,
  formatString,
} from "@/utilites/miscFunctions";
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
  if (shownData.length === 0) return <></>;
  for (const entry of shownData) {
    if (!pinnedData.some((element) => element.courseId === entry.courseId)) {
      filteredData.push(entry);
    }
  }
  return (
    <table
      id="all"
      className="md:my-5 border-2 border-gray-300 rounded-md p-2 text-center text-white lg:w-80 whitespace-pre"
    >
      <thead className="bg-gray-200 bg-opacity-40 border px-4 py-2">
        <tr>
          <th className={`bg-gray-200 bg-opacity-40 border px-4 py-2`}>
            Course ID
          </th>
          <th
            className={`hidden bg-gray-200 bg-opacity-40 border md:px-4 md:py-2 md:table-cell`}
          >
            Time
          </th>
          <th
            className={`sm:h-8 sm:w-20 sm:my-3 sm:mx-5 bg-gray-200 bg-opacity-40 border md:table-cell md:px-4 md:py-2`}
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
        {filteredData
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
              <tr key={idx}>
                <td className={`text-center border md:px-4 md:py-2 ${classes}`}>
                  {formatString(item.courseId)}
                </td>
                <td
                  className={`hidden text-center border md:px-4 md:py-2 ${classes} whitespace-nowrap md:table-cell`}
                >
                  {convertTimeTo24HourFormat(item.time)}
                </td>
                <td
                  className={`sm:h-8 sm:w-20 sm:my-3 sm:mx-5 text-center border md:px-4 md:py-2 ${classes}`}
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
                    className="bg-blue-700 hover:bg-blue-900 h-8 w-20 my-3 mx-5 rounded-md text-white md:h-auto md:w-auto md:text-center md:font-bold md:py-2 md:px-4 md:rounded-full"
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
