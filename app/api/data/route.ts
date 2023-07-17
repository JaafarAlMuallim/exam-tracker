import puppeteer from "puppeteer";

type Data = {
  courseId: string;
  courseName: string;
  time: string;
  date: string;
  day: string;
  location: string;
};

export async function GET(request: Request) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: "new",
  });
  const page = await browser.newPage();
  await page.goto(
    "https://registrar.kfupm.edu.sa/exams-grades/final-exam-schedule/"
  );
  // select option for select tag
  const selecting = await page.select("#term_option", "202230");
  console.log(selecting);
  // check for success in selecting option
  // wait for page to load
  const table = await page.waitForSelector("div > #data-table");
  await page.screenshot({ path: "example.png" });
  //   const table = await page.$("div > #data-table");
  console.log(table);
  //   const data: Data[] = [];
  const mainData = await page.evaluate(() => {
    const trs: HTMLDataElement[] = Array.from(
      document.querySelectorAll("div div table tr")
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
    return data;
  });
  // screenshot

  //   const data = tds.map((td) => td.innerText);
  console.log(mainData);
  // for (let i = 1; i < rows.length; i++) {
  //   const row = rows[i];
  //   const columns = await row.$$("td");
  //   const course = await columns[0].evaluate((node) => node.innerText);
  //   const name = await columns[1].evaluate((node) => node.innerText);
  //   const time = await columns[2].evaluate((node) => node.innerText);
  //   const date = await columns[3].evaluate((node) => node.innerText);
  //   const day = await columns[4].evaluate((node) => node.innerText);
  //   const location = await columns[5].evaluate((node) => node.innerText);
  //   const dataObj: Data = {
  //     course,
  //     name,
  //     time,
  //     date,
  //     day,
  //     location,
  //   };
  //   data.push(dataObj);
  // }

  await browser.close();
  return new Response(JSON.stringify({ exams: mainData }));
}
