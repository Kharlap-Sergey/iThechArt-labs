export function formateDate(dateString) {
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
  const year = date.getFullYear();
  const month = date.getMonth();

  return `${monthNames[month]} ${day}`;
  }

export function formateNumberToTypeOfAd(t){
    if(t == 1) return "to lease"
    return "to rent"
}