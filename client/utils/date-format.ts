import { parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

export const formatDate = (isoDate: string) => {
  const parseDate = parseISO(isoDate);

  const formattedDate = formatInTimeZone(
    parseDate,
    "Asia/Manila",
    "MMM dd, yyyy h:mma"
  );

  return formattedDate;
};
