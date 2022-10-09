import moment from "moment";

export const formatDate = (date) => {
  return moment(date).format("HH:mm DD/MM/YYYY");
};
