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
  const formattedDateTime = dateObj.toLocaleString();
  return formattedDateTime;
}