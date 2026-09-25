const ORDINALS = {
  1: "1st", 2: "2nd", 3: "3rd", 4: "4th", 5: "5th", 6: "6th", 7: "7th",
  8: "8th", 9: "9th", 10: "10th", 11: "11th", 12: "12th", 13: "13th",
  14: "14th", 15: "15th", 16: "16th", 17: "17th", 18: "18th", 19: "19th",
  20: "20th", 21: "21st", 22: "22nd", 23: "23rd", 24: "24th", 25: "25th",
  26: "26th", 27: "27th", 28: "28th",
};

function ordinal(day) {
  return ORDINALS[day] || `${day}th`;
}

function monthAbbr(date) {
  return date.toLocaleString("en-US", { month: "short" });
}

/**
 * Generates a rolling window of upcoming batch date ranges for a retreat that
 * starts on the same day-of-month every month (e.g. "3rd", "9th", "15th").
 * Always computed from the real current date, so it never goes stale like a
 * hardcoded date table would.
 *
 * @param {number} startDay - day of the month the retreat starts (e.g. 3)
 * @param {number} durationDays - length of the retreat in days (e.g. 7)
 * @param {number} count - how many upcoming batches to generate
 */
export function generateRetreatDates(startDay, durationDays, count = 10) {
  const now = new Date();
  const batches = [];
  let cursor = new Date(now.getFullYear(), now.getMonth(), startDay);
  if (cursor < now) {
    cursor = new Date(now.getFullYear(), now.getMonth() + 1, startDay);
  }

  for (let i = 0; i < count; i++) {
    const start = new Date(cursor.getFullYear(), cursor.getMonth(), startDay);
    const end = new Date(start);
    end.setDate(end.getDate() + durationDays - 1);

    const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
    const label = sameMonth
      ? `${ordinal(start.getDate())} – ${ordinal(end.getDate())} ${monthAbbr(end)} ${end.getFullYear()}`
      : `${ordinal(start.getDate())} ${monthAbbr(start)} – ${ordinal(end.getDate())} ${monthAbbr(end)} ${end.getFullYear()}`;

    batches.push(label);
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, startDay);
  }

  return batches;
}
