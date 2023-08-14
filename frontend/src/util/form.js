import { closeModal } from "./modal";

export function prepareForm(formInputs) {
  // create the initial form object (input's names as keys and empty string as the initial values)
  return formInputs.reduce(
    (form, input) => ({
      ...form,
      [input.name]: input.value ? input.value : "",
    }),
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

export function trimFormTrailingSpaces(form) {
  const trimExceptions = [
    "password",
    "passwordConfirm",
    "passwordCurrent",
    "passwordNew",
    "deadline",
  ];
  return Object.fromEntries(
    Object.entries(form).map(([key, value]) => {
      // we consider trailing spaces in password part of password
      if (!trimExceptions.includes(key)) {
        return [key, value.trim()];
      }
      return [key, value];
    })
  );
}

export function formatDateISO(date) {
  const dateObj = new Date(date);

  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  const year = dateObj.getFullYear();

  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function deadlinePassed(deadline) {
  return new Date(deadline) < new Date();
}

export const onSuccessAfterSubmit = (
  queryClient,
  dataKey,
  transformDataFn,
  isCreatingNew,
  dispatch,
  formFor
) => ({
  onSuccess: (data) => {
    queryClient.setQueryData(dataKey, (oldQueryData) => {
      const updatedData = transformDataFn(data);
      const dataAfterUpdate = isCreatingNew
        ? [...oldQueryData, updatedData]
        : oldQueryData.map((item) =>
            item.id === updatedData.id ? updatedData : item
          );
      return dataAfterUpdate;
    });
    const formResetRequired = { required: !isCreatingNew, for: formFor };
    closeModal(dispatch, formResetRequired);
  },
});

export const onErrorAfterSubmit = (error, setStatus) =>
  setStatus({ error: true, message: error.toString().substring(7) });
