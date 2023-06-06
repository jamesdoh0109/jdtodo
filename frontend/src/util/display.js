export function formatDate(date) {
  const dateObj = new Date(date);

  const month = dateObj.getMonth() + 1; // Months are zero-based, so we add 1
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate;
}

export function sortById(obj) {
  return obj
    ?.slice() // Create a copy of the array to avoid mutating the original array
    .sort((a, b) => a.id - b.id);
}
