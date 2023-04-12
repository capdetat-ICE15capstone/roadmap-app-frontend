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
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDate = dateObj.toLocaleString('en-US', options);
  return formattedDate;
}