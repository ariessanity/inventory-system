import { addHours, endOfDay, startOfDay } from 'date-fns';

//to PH time
const currentDate = addHours(new Date(), 8);

//+8 to set 00:00:00
export const todayStart = startOfDay(currentDate);
export const todayEnd = endOfDay(currentDate);

//get current month
export const currentMonth = new Date().getMonth() + 1;