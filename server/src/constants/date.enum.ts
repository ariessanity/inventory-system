import { addHours, endOfDay, startOfDay } from 'date-fns';

//to PH time
const currentDate = new Date();

//+8 to set 00:00:00
export const todayStart = addHours(startOfDay(currentDate), 8);
export const todayEnd = addHours(endOfDay(currentDate), 8);
