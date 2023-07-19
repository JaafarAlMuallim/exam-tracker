import Data from "@/model/Data";
import XLSX from "xlsx";

const downloadSchedule = (fileType: string, pinnedData: Data[]) => {
  let element = document.createElement("a");
  switch (fileType) {
    case "txt":
      let text = "";
      pinnedData.forEach((item) => {
        text += `${item.courseId} ${item.time} ${item.date} ${item.day} ${item.location}\n`;
      });
      element = document.createElement("a");
      const txt = new Blob([text], { type: "text/plain" });
      element.href = URL.createObjectURL(txt);
      element.download = "schedule.txt";
      document.body.appendChild(element);
      element.click();
      break;
    case "csv":
      const csvRows = [];
      const headers = Object.keys(pinnedData[0]);
      csvRows.push(headers.join(","));
      for (const row of pinnedData) {
        const values = Object.values(row);
        csvRows.push(values.join(","));
      }
      const csvData = csvRows.join("\n");
      const csv = new Blob([csvData], { type: "text/csv" });
      element.href = URL.createObjectURL(csv);
      element.download = "schedule.csv";
      document.body.appendChild(element);
      element.click();
      break;
    case "xlsx":
      /* Create worksheet from HTML DOM TABLE */
      const table = document.getElementById("pinned");
      const wb = XLSX.utils.table_to_book(table);
      console.log("CLICKED");
      /* Export to file (start a download) */
      XLSX.writeFile(wb, "schedule.xlsx");
    default:
      break;
  }
};
export default downloadSchedule;
