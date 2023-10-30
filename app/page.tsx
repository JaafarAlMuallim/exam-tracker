import Data from "@/model/Data";
import Content from "./components/Content";
import { checkEnv } from "@/utilites/checkEnv";
import {
  convertTimeTo24HourFormat,
  sortByDateAndTime,
} from "@/utilites/miscFunctions";

export const dynamic = "force-dynamic";
export default async function Home() {
  const res = await fetch(checkEnv().concat("/api/data"), {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    return <div className="hidden">Failed to load data</div>;
  }
  const data: { exams: Data[] } = await res.json();
  data.exams.sort((a, b) => {
    const aTime = convertTimeTo24HourFormat(a.time);
    const bTime = convertTimeTo24HourFormat(b.time);
    const dateA = new Date(`${a.date} ${aTime}`);
    const dateB = new Date(`${b.date} ${bTime}`);

    if (dateA > dateB) return 1;
    if (dateA < dateB) return -1;
    return 0;
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Content data={data.exams} />
    </main>
  );
}
