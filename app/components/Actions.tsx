import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Data from "@/model/Data";
import downloadSchedule from "@/utilites/fileDownload";

export default function Actions({ data }: { data: Data[] }) {
  return (
    <>
      <Popover>
        <PopoverTrigger
          disabled={data.length === 0}
          className={`bg-blue-500 inline-flex hover:bg-blue-700${
            data.length === 0 ? "bg-gray-600 hover:bg-gray-800" : ""
          } text-white font-bold py-2 px-4 rounded-full my-5`}
        >
          Download Schedule
        </PopoverTrigger>
        <PopoverContent className="bg-slate-600 border-transparent rounded-xl mb-5">
          <div className="flex flex-col">
            <button
              onClick={() => downloadSchedule("txt", data)}
              className={`bg-blue-500 inline-flex justify-center hover:bg-blue-700${
                data.length === 0 ? "bg-gray-600 hover:bg-gray-800" : ""
              } text-white font-bold py-2 px-4 rounded-full my-5 `}
              disabled={data.length === 0}
            >
              Schedule.txt
            </button>
            <button
              onClick={() => downloadSchedule("csv", data)}
              className={`bg-blue-500 inline-flex justify-center hover:bg-blue-700 ${
                data.length === 0 ? "bg-gray-600 hover:bg-gray-800" : ""
              } text-white font-bold py-2 px-4 rounded-full my-5`}
              disabled={data.length === 0}
            >
              Schedule.csv
            </button>
            <button
              onClick={() => downloadSchedule("xlsx", data)}
              className={`bg-blue-500 inline-flex justify-center hover:bg-blue-700 ${
                data.length === 0 ? "bg-gray-600 hover:bg-gray-800" : ""
              } text-white font-bold py-2 px-4 rounded-full my-5`}
              disabled={data.length === 0}
            >
              Schedule.xlsx
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
