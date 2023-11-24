import { format } from "date-fns";

export const formatDate = (isoDate: Date) => {
    const formattedDate = format(new Date(isoDate), "MMM dd, yyyy h:mma");
    return formattedDate;
  };