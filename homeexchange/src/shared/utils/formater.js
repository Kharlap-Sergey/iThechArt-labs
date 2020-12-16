export function formateDate(dateString) {
    const date = new Date(dateString)
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth();

    return `${month}/${day}/${year}`;
  }

export function formateNumberToTypeOfAd(t){
    if(t == 1) return "to lease"
    return "to rent"
}