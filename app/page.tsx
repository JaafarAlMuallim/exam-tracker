import Data from "@/model/Data";
import Content from "./components/Content";
import { sortByDateAndTime } from "@/utils/utils";
import checkEnvironment from "@/utils/checkEnv";

const getData = async () => {
  const url = checkEnvironment().concat(`/api/data`);
  const res = await fetch(url);
  const data = (await res.json()) as { exams: Data[] };
  return data;
};

export default async function Home() {
  const data = await getData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Content data={sortByDateAndTime(data.exams)} />
    </main>
  );
}
