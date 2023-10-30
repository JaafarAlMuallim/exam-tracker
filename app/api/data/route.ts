import Data from "@/model/Data";
import { convertTimeTo24HourFormat } from "@/utilites/miscFunctions";
import puppeteer from "puppeteer";

export async function GET(request: Request) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: "new",
  });
  const page = await browser.newPage();
  await page.goto(
    "https://registrar.kfupm.edu.sa/exams-grades/final-exam-schedule/",
  );
  await page.select("#term_option", "202310");
  await page.waitForSelector("div > #data-table");
  const mainData = await page.evaluate(() => {
    const trs: HTMLDataElement[] = Array.from(
      document.querySelectorAll("div div table tr"),
    );
    const data: Data[] = [];
    for (let i = 1; i < trs.length; i++) {
      const tds = trs[i].querySelectorAll("td");
      const courseId = tds[0].innerText;
      const courseName = tds[1].innerText;
      const time = tds[2].innerText;
      const date = tds[3].innerText;
      const day = tds[4].innerText;
      const location = tds[5].innerText;
      const dataObj: Data = {
        courseId,
        courseName,
        time,
        date,
        day,
        location,
      };
      data.push(dataObj);
    }
    data.sort((a, b) => {
      const aTime = convertTimeTo24HourFormat(a.time);
      const bTime = convertTimeTo24HourFormat(b.time);
      const dateA = new Date(`${a.date} ${aTime}`);
      const dateB = new Date(`${b.date} ${bTime}`);
      if (dateA > dateB) return 1;
      if (dateA < dateB) return -1;
      return 0;
    });
    return data;
  });

  await browser.close();
  return new Response(JSON.stringify({ exams: mainData }), {
    headers: { "content-type": "application/json" },
  });
}
