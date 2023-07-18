import { ChangeEvent, RefObject } from "react";

export default function Filters({
  courseCodeRef,
  handleCourseName,
}: {
  courseCodeRef: RefObject<HTMLInputElement>;
  handleCourseName: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <label htmlFor="course" className="text-xl font-bold mb-5">
        Enter your course name
      </label>
      <input
        ref={courseCodeRef}
        type="text"
        name="course"
        id="course"
        className="border-2 border-gray-300 rounded-md p-2 text-black mb-5"
        onChange={handleCourseName}
      />
    </div>
  );
}
