import moment from 'moment';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const convertDate = (date: any) => {
  // const dateChange =
  //   (date.getDate() < 10 ? '0' : '') +
  //   date.getDate() +
  //   '/' +
  //   (date.getMonth() + 1 < 10 ? '0' : '') +
  //   (date.getMonth() + 1) +
  //   '/' +
  //   date.getFullYear().toString();
  const dateChange = moment(date).format('DD/MM/YYYY');
  return dateChange;
};
export const convertDateMin = (date: any) => {
  // const dateMin = date.getDate() - 5;
  // const dateChange =
  //   (dateMin < 10 ? '0' : '') +
  //   dateMin +
  //   '/' +
  //   (date.getMonth() + 1 < 10 ? '0' : '') +
  //   (date.getMonth() + 1) +
  //   '/' +
  //   date.getFullYear().toString();
  const dateChange = moment(date).subtract(5, 'days').format('DD/MM/YYYY');
  return dateChange;
};
export function convertDateToISO(dateString: any) {
  return moment(dateString, 'YYYY-MM-DD HH:mm:ss').toISOString();
}
export function convertDateMoment(dateString: string) {
  return moment(dateString).format('DD/MM/YYYY');
}
