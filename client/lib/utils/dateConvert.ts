import moment from "moment";

export function timeAgo(date: string) {
  return moment(date).fromNow()
}

export const formatDate = (date: string | Date) => {
  return moment(date).format("DD YY MM");
};


