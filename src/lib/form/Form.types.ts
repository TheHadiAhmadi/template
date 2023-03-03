import type { Writable } from "svelte/store";

export type FormContext = {
  register: (name: string, ctx: any) => void;
  unregister: (name: string) => void;
  errors: Record<string, (...x: any[]) => string>;
  dirty: Writable<boolean>;
};

export type FormType = typeof import("./AppForm.svelte")["default"] & {
  Input: typeof import("./AppInput.svelte")["default"];
  Select: typeof import("./AppSelect.svelte")["default"];
  Checkboxes: typeof import("./AppCheckboxes.svelte")["default"];
  Radios: typeof import("./AppRadios.svelte")["default"];
  Array: typeof import("./AppFormArray.svelte")["default"];
  Object: typeof import("./AppFormObject.svelte")["default"];
};
