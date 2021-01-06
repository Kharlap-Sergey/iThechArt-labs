export function formatDate(dateString) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth();

  return `${monthNames[month]} ${day}`;
}

export function formatNumberToTypeOfAd(t) {
  if (t === 1) return "to lease";
  if (t === 2) return "to rent";
}
