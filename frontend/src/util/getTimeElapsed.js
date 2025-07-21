const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

export default function getTimeElapsedString(dateOfCreationString) {
  const timeDiffInSec = Math.round(
    (new Date() - new Date(dateOfCreationString)) / 1000
  );

  if (timeDiffInSec >= 0 && timeDiffInSec < minuteSeconds)
    return `${timeDiffInSec}s`;
  else if (timeDiffInSec >= minuteSeconds && timeDiffInSec < hourSeconds) {
    const timeDiffInMin = Math.round(timeDiffInSec / minuteSeconds);
    return `${timeDiffInMin}m`;
  } else if (timeDiffInSec >= hourSeconds && timeDiffInSec < daySeconds) {
    const timeDiffInHr = Math.round(timeDiffInSec / hourSeconds);
    return `${timeDiffInHr}h`;
  } else {
    const timeDiffInDay = Math.round(timeDiffInSec / daySeconds);
    return `${timeDiffInDay}d`;
  }
}
