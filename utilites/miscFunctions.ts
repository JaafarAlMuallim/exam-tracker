import Data from "@/model/Data";
export const convertTimeTo24HourFormat = (time: string) => {
  if (time.endsWith("PM") && !time.startsWith("12")) {
    const hour = parseInt(time.slice(0, 2)) + 12;
    return `${hour}:${time.slice(2, 4)}`;
  } else {
    return time.slice(0, -2);
  }
};

const sortByDateAndTime = (data: Data[]) => {
  const sortedByName = data.sort((a, b) =>
    a.courseName.localeCompare(b.courseName),
  );
  const sortedByTime = sortedByName.sort((a, b) => {
    const timeA = convertTimeTo24HourFormat(a.time);
    const timeB = convertTimeTo24HourFormat(b.time);
    return timeA.localeCompare(timeB);
  });
  const sortedByDate = sortedByTime.sort((a, b) =>
    a.date.localeCompare(b.date),
  );
  return sortedByDate;
};

const formatString = (id: string) => {
  if (id.split(" ").length === 2) {
    return id;
  } else {
    const index = id.search(/[0-9]/);
    return `${id.slice(0, index)} ${id.slice(index)}`;
  }
};
export { sortByDateAndTime, formatString };
