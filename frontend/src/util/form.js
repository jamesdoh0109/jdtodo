export function prepareForm(formInputs) {
  // create the initial form object (input's names as keys and empty string as the initial values)
  return formInputs.reduce(
    (form, input) => ({ ...form, [input.name]: input.value ? input.value : "" }),
    {}
  );
}

export function splitNameIntoLines(name) {
  const words = name.split(" ");
  const lines = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word.length > 15) {
      const splittedWord = word.replace(/(.{15})/g, "$1-");
      lines.push(splittedWord);
    } else {
      lines.push(word);
    }
  }

  return lines.join(" ");
}

export function projectNameTooLong(name) {
  return name.length > 25;
}

export function taskNameTooLong(name) {
  return name.length > 60;
}

export function taskFormMissingRequiredFields (name, deadline, status) {
  return name === "" || deadline === "" || status === ""
}

export function taskDescriptionTooLong(description) {
  return description.length > 300;
}

export function trimFormTrailingSpaces(form) {
  const passwordRelatedKeys = [
    "password",
    "password2",
    "currentPassword",
    "newPassword",
    "confirmPassword",
  ];
  return Object.fromEntries(
    Object.entries(form).map(([key, value]) => {
      // we consider trailing spaces in password part of password
      if (!passwordRelatedKeys.includes(key)) {
        return [key, value.trim()];
      }
      return [key, value];
    })
  );
}

export function formatDateISO(date) {
  const dateObj = new Date(date);

  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const year = dateObj.getFullYear();

  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
  
  return formattedDate;
}

export function getUserTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function deadlinePassed(deadline) {
  return new Date(formatDateISO(deadline)) < new Date();
}
