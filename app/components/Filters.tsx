import { ChangeEvent, RefObject } from "react";

export default function Filters({
  courseCodeRef,
  handleCourseName,
  toggle,
  showTable,
}: {
  courseCodeRef: RefObject<HTMLInputElement>;
  handleCourseName: (e: ChangeEvent<HTMLInputElement>) => void;
  toggle: () => void;
  showTable: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* create span that shows a note that only shows in small devices that all info appears in desktop view or if they flip phone */}
      <span className="text-sm font-mono text-yellow-500 my-8 whitespace-normal md:hidden">
        NOTE: all info are shown in desktop view or if you flip your phone :
        {")"}
      </span>
      <label
        htmlFor="course"
        className="text-white text-xl font-bold mb-5 whitespace-nowrap"
      >
        Enter course id
      </label>
      <input
        ref={courseCodeRef}
        type="text"
        name="course"
        id="course"
        className="border-2 border-gray-300 rounded-md p-2 text-black mb-5"
        onChange={handleCourseName}
        // placeholder="XXX 123"
      />
      <button
        onClick={toggle}
        className={`text-white bg-blue-500 inline-flex hover:bg-blue-700text-white font-bold py-2 px-4 rounded-full mb-5`}
      >
        {!showTable ? "Show" : "Hide"} Exams
      </button>
    </div>
  );
}
