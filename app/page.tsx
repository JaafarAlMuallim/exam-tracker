import Data from "@/model/Data";
import Content from "./components/Content";
import { sortByDateAndTime } from "@/utils/utils";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/data");
  const data = (await res.json()) as { exams: Data[] };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Content data={sortByDateAndTime(data.exams)} />
    </main>
  );
}
