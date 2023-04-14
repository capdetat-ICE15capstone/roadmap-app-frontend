export function shortenString(str, maxLength) {
  if (str === undefined) {
    return "null";
  }
  if (str.length > maxLength) {
    str = str.slice(0, maxLength) + '...';
  }
  return str;
}

export function convertDateTimeString(str) {
  const dateObj = new Date(str);
  const options = { year: 'numeric', month: 'long', day: 'numeric'};
  const formattedDate = dateObj.toLocaleString('en-US', options);
  return formattedDate;
}

export function roundTimeToNearest30(date = new Date()) {
  const minutes = 30;
  const ms = 1000 * 60 * minutes;

  return new Date(Math.ceil(date.getTime() / ms) * ms);
}