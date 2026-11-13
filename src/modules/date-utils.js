import {
  endOfDay,
  format,
  formatDuration,
  intervalToDuration,
  isSameDay,
  isValid,
  parse,
  parseISO,
} from 'date-fns';

function getLocalDateTimeString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function getNextAvailableDateTime() {
  const nextMinute = new Date(Math.ceil(Date.now() / 60000) * 60000);
  return getLocalDateTimeString(nextMinute);
}

export function getDateTimeInputValue(dateValue) {
  const isoDate = parseISO(dateValue);
  if (isValid(isoDate)) {
    return dateValue.length > 10 ? dateValue : `${dateValue}T23:59`;
  }

  const legacyDate = parse(dateValue, 'M/d/yyyy', new Date());
  return isValid(legacyDate) ? `${format(legacyDate, 'yyyy-MM-dd')}T23:59` : '';
}

export function formatCompletionTimestamp(timestamp) {
  const completedAt = new Date(timestamp);
  return isValid(completedAt) ? format(completedAt, 'PPP p') : '';
}

function getDueDate(dateValue) {
  const isoDate = parseISO(dateValue);
  if (isValid(isoDate)) {
    return dateValue.length > 10 ? isoDate : endOfDay(isoDate);
  }

  const legacyDate = parse(dateValue, 'M/d/yyyy', new Date());
  return isValid(legacyDate) ? endOfDay(legacyDate) : null;
}

function formatCompactDuration(duration, units) {
  const abbreviations = {
    years: 'y',
    months: 'mo',
    weeks: 'w',
    days: 'd',
    hours: 'h',
    minutes: 'min',
    seconds: 's',
  };
  return units
    .map((unit) => `${duration[unit]}${abbreviations[unit]}`)
    .join(', ');
}

export function formatDueDateDisplay(dateValue, referenceTime = new Date()) {
  const dueDate = getDueDate(dateValue);

  if (!dueDate) {
    return {
      text: dateValue || 'No due date',
      title: '',
      state: 'invalid',
    };
  }

  let now =
    referenceTime instanceof Date ? referenceTime : new Date(referenceTime);
  if (!isValid(now)) now = new Date();

  const overdue = now > dueDate;
  const duration = intervalToDuration({
    start: overdue ? dueDate : now,
    end: overdue ? now : dueDate,
  });
  duration.weeks = Math.floor((duration.days || 0) / 7);
  duration.days = (duration.days || 0) % 7;

  const units = [
    'years',
    'months',
    'weeks',
    'days',
    'hours',
    'minutes',
    'seconds',
  ];
  const visibleUnits = units.filter((unit) => duration[unit] > 0).slice(0, 3);
  const formattedDuration =
    visibleUnits.length === 3
      ? formatCompactDuration(duration, visibleUnits)
      : formatDuration(visibleUnits.length ? duration : { seconds: 1 }, {
          format: visibleUnits.length ? visibleUnits : ['seconds'],
          delimiter: ', ',
        });

  return {
    text: `${overdue ? 'Overdue by' : 'Due in'} ${formattedDuration}`,
    title: `Due date: ${format(
      dueDate,
      dateValue.length > 10 ? 'PPP p' : 'PPP'
    )}`,
    state: overdue ? 'overdue' : isSameDay(now, dueDate) ? 'today' : 'upcoming',
  };
}
