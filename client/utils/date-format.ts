import { format } from "date-fns";

export const formatDate = (isoDate: Date) => {
  const originalDate = new Date(isoDate);
  const localTime = originalDate.toLocaleString("en-US", {
    timeZone: "Asia/Manila",
  });

  const formattedDate = format(new Date(localTime), "MMM dd, yyyy h:mma");

  return formattedDate;
};
