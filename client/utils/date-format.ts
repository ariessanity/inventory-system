import { formatInTimeZone } from "date-fns-tz";

export const formatDate = (isoDate: Date) => {
  // const formattedDate = format(new Date(localTime), "MMM dd, yyyy h:mma");
  const formattedDate = formatInTimeZone(new Date(isoDate), 'Asia/Manila', 'MMM dd, yyyy h:mma')

  return formattedDate;
};
