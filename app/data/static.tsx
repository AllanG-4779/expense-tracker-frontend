import { formatDate, getDaysInMonth, getISOWeekYear } from "date-fns";

export const getGraphData = (parameter: string, data: number[]) => {
  const datasets = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Expenditure",
        data,
        borderColor: "#dc4b3e",
        tension: 0.3,
      },
    ],
  };

  datasets.labels = getIsoWeek(new Date(), parameter);
  return datasets;
};

const getIsoWeek = (date: Date, param: string): string[] => {
  const year = getISOWeekYear(date);
  // Jan 4 is the ISO WEEK start
  let length = 7;
  let startDate = new Date();
  let format = "EEE";
  if (param === "monthly") {
    length = date.getDate();
    startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    format = "dd-MM-yy";
  } else if (param === "yearly") {
    length = 12;
    format = "MM";
  }
  console.log("length of the duration " + length);
  const dates = Array.from({ length }, (_, i) => {
    const dated = new Date(startDate);
    dated.setDate(dated.getDate() + i);
    return formatDate(dated, format);
  });

  return dates;
};
