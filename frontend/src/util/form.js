export function prepareForm(formInputs) {
  // create the initial form object (input's names as keys and empty string as the initial values)
  return formInputs.reduce((r, v) => ({ ...r, [v.name]: v.value ? v.value : "" }), {});
};