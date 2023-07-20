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
        for (let i = 0; i < values.length; i++) {
          if (values[i].includes("-")) {
            values[i] = values[i].replaceAll(",", "||");
          }
        }
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
      const mainTable = document.getElementById("pinned") as HTMLTableElement;
      const table = mainTable.cloneNode(true) as HTMLTableElement;
      const rows = table.rows;
      for (let i = 0; i < rows[0].cells.length; i++) {
        const str = rows[0].cells[i].innerText;
        if (str.search("Action") !== -1) {
          for (let j = 0; j < rows.length; j++) {
            rows[j].deleteCell(i);
          }
        }
      }
      const wb = XLSX.utils.table_to_book(table);

      XLSX.writeFile(wb, "schedule.xlsx");
      break;
    default:
      break;
  }
};
export default downloadSchedule;
