const minuteSeconds = 60;
const hourSeconds = minuteSeconds * 60;
const daySeconds = hourSeconds * 24;
const weekSeconds = daySeconds * 7;
const monthSeconds = weekSeconds * 4;
const yearSeconds = monthSeconds * 12;

function pluralize(item, quantity) {
  return quantity !== 1 ? `${item}s` : item;
}

export default function getTimePointString(date) {
  let currDate = new Date();
  const secondsDiff = (currDate - date) / 1000;

  if (secondsDiff <= 0 || secondsDiff < minuteSeconds) {
    return "Just now";
  } else if (secondsDiff < hourSeconds) {
    const minutesDiff = Math.floor(secondsDiff / minuteSeconds);
    return `${minutesDiff} ${pluralize("minute", minutesDiff)} ago`;
  } else if (secondsDiff < daySeconds) {
    const hoursDiff = Math.floor(secondsDiff / hourSeconds);
    return `${hoursDiff} ${pluralize("hour", hoursDiff)} ago`;
  } else if (secondsDiff < weekSeconds) {
    const daysDiff = Math.floor(secondsDiff / daySeconds);
    return `${daysDiff} ${pluralize("day", daysDiff)} ago`;
  } else if (secondsDiff < monthSeconds) {
    const weeksDiff = Math.floor(secondsDiff / weekSeconds);
    return `${weeksDiff} ${pluralize("week", weeksDiff)} ago`;
  } else if (secondsDiff < yearSeconds) {
    const monthsDiff = Math.floor(secondsDiff / monthSeconds);
    return `${monthsDiff} ${pluralize("month", monthsDiff)} ago`;
  } else {
    const yearsDiff = Math.floor(secondsDiff / yearSeconds);
    return `${yearsDiff} ${pluralize("year", yearsDiff)} ago`;
  }
}
