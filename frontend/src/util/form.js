export function prepareForm(formInputs) {
  // create the initial form object (input's names as keys and empty string as the initial values)
  return formInputs.reduce(
    (r, v) => ({ ...r, [v.name]: v.value ? v.value : "" }),
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
