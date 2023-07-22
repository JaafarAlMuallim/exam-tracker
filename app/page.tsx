import Data from "@/model/Data";
import Content from "./components/Content";
import { sortByDateAndTime } from "@/utils/utils";
import { checkEnv } from "@/utils/checkEnv";

export const dynamic = "force-dynamic";
export default async function Home() {
  const res = await fetch(checkEnv().concat("/api/data"), {
    cache: "force-cache",
  });
  if (!res.ok) {
    return <div className="hidden">Failed to load data</div>;
  }
  const data: { exams: Data[] } = await res.json();
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Content data={sortByDateAndTime(data.exams)} />
    </main>
  );
}
