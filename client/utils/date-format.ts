import { addHours, format, parseISO } from "date-fns";
import { formatInTimeZone, zonedTimeToUtc } from "date-fns-tz";

export const formatDate = (isoDate: string) => {
  const dateInGMTPlus8 = parseISO(isoDate);
  const dateInUTC = addHours(dateInGMTPlus8, -8);

  const formattedDate = formatInTimeZone(
    dateInUTC,
    "Asia/Manila",
    "MMM dd, yyyy h:mma"
  );

  return formattedDate;
};
