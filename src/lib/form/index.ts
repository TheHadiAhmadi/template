export const something = true;

import AppForm from "./AppForm.svelte";
import AppInput from "./AppInput.svelte";
import AppFormObject from "./AppFormObject.svelte";
import AppSelect from "./AppSelect.svelte";
import AppRadios from "./AppRadios.svelte";
import AppCheckboxes from "./AppCheckboxes.svelte";
import AppFormArray from "./AppFormArray.svelte";
import AppFormField from "./AppFormField.svelte";

export type FormType = typeof AppForm & {
  Input: typeof AppInput;
  Select: typeof AppSelect;
  Checkboxes: typeof AppCheckboxes;
  Radios: typeof AppRadios;
  Array: typeof AppFormArray;
  Object: typeof AppFormObject;
  Field: typeof AppFormField;
};

const Form = AppForm as unknown as FormType;
Form.Input = AppInput;
Form.Select = AppSelect;
Form.Checkboxes = AppCheckboxes;
Form.Radios = AppRadios;
Form.Array = AppFormArray;
Form.Object = AppFormObject;
Form.Field = AppFormField;

export default Form;
