import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const day = dayjs;
export const now = dayjs().format("dddd, D MMM YY");
