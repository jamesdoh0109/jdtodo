import { useMutateData } from "../hooks/useDataOperations";
import { modalActions } from "../store/reducers/modal";
import { hasEmptyFields } from "./auth";
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

export function projectNameTooLong(name) {
  return name.length > 25;
}

export function taskNameTooLong(name) {
  return name.length > 60;
}

export function taskFormMissingRequiredFields(name, deadline, status) {
  return name === "" || deadline === "" || status === "";
}

export function taskDescriptionTooLong(description) {
  return description.length > 300;
}

export function formatTaskFromServer(task) {
  return {
    id: task.task_id,
    name: task.task_name,
    deadline: task.task_deadline,
    description: task.task_description,
    status: task.task_status,
    isDone: task.task_status === "Finished" ? true : false,
  };
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

export function formHasErrors(values, errors) {
  return (
    Object.keys(errors).length !== 0 || hasEmptyFields(...Object.values(values))
  );
}

export function formatDateISO(date) {
  const dateObj = new Date(date);

  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");
  const year = dateObj.getFullYear();

  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  return formattedDate;
}

export function getUserTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function deadlinePassed(deadline) {
  return new Date(formatDateISO(deadline)) < new Date();
}

export async function submitData(
  requestURL,
  requestMethod,
  fetchData,
  handleResponse,
  data,
  token
) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (token) {
    headers.Authorization = "Bearer " + token;
  }
  const requestConfig = {
    url: requestURL,
    method: requestMethod,
    headers: headers,
  };
  if (data) {
    requestConfig.body = JSON.stringify(trimFormTrailingSpaces(data));
  }

  await fetchData(
    requestConfig,
    undefined, // no need to do any prefetching for form submission so pass in undefined
    handleResponse
  );
}

export const onSuccessAfterCreateOrEditData = (
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
