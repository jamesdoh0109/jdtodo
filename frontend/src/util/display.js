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

export function sortByDeadline(tasks) {
  return tasks.slice().sort((task1, task2) => {
    const deadline1 = new Date(task1.deadline);
    const deadline2 = new Date(task2.deadline);

    if (deadline1 < deadline2) {
      return -1;
    } else if (deadline1 > deadline2) {
      return 1;
    } else {
      return 0;
    }
  });
}

export function sortByName(tasks) {
  return tasks.slice().sort((task1, task2) => {
    const name1 = task1.name.toLowerCase();
    const name2 = task2.name.toLowerCase();

    if (name1 < name2) {
      return -1;
    } else if (name1 > name2) {
      return 1;
    } else {
      return 0;
    }
  });
}

export function sortByStatus(tasks) {
  const statusOrder = {
    "Not started": 1,
    "In progress": 2,
    "Finished": 3,
  };

  return tasks.slice().sort((task1, task2) => {
    const status1 = statusOrder[task1.status];
    const status2 = statusOrder[task2.status];

    if (status1 < status2) {
      return -1;
    } else if (status1 > status2) {
      return 1;
    } else {
      return 0;
    }
  });
};
