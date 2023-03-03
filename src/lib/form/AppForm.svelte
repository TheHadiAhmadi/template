<script lang="ts">
  import { createEventDispatcher, onMount, setContext } from "svelte";
  import type { FormContext } from "./Form.types";
  import { writable } from "svelte/store";
  import AppFormObject from "./AppFormObject.svelte";

  const dispatch = createEventDispatcher();

  const dirty = writable(false);

  let validationErrors: Record<string, string> = {};

  export let values: any = {};

  export async function validate() {
    dirty.set(true);

    const result = await form["main"].validate(true);
    if (result) {
      values = result;
    } else {
      values = {};
    }
  }

  let form: Record<string, any> = {};

  const register: FormContext["register"] = (name, ctx) => {
    form[name] = ctx;
  };

  const unregister: FormContext["unregister"] = (name) => {
    delete form[name];
  };

  const errors = {
    string: () => "this should be string",
    number: () => "this should be number",
    required: () => "this field is required",
    min_string: (min: number) => `this should be at least ${min} characters`,
    max_string: (max: number) =>
      `this should not be more than ${max} characters`,
    min_number: (min: number) => `this value should be at least ${min}`,
    max_number: (max: number) => `this value should not be more than ${max}`,
    min_array: (max: number) => `should be at least ${max} items`,
    max_array: (max: number) => `should not be more than ${max} items`,
    pattern: (pattern: string) => `this field should match pattern: ${pattern}`,
    email: () => `this field should be a vaild email adderss`,
  };

  setContext("FORM", { register, unregister, errors, dirty });

  async function onSubmit(e: any) {
    await validate();
    if (Object.keys(validationErrors).length === 0) {
      dispatch("submit", values);
    }
  }

  async function onReset(e: any) {
    try {
      form["main"].reset();
    } catch (err) {
      //
    }
    $dirty = false;
    dispatch("reset");
  }

  onMount(() => {
    if (values) {
      form["main"].set(values);
    }
  });
</script>

<form novalidate on:reset={onReset} on:submit|preventDefault={onSubmit}>
  <AppFormObject name="main">
    <slot form={form["main"]} />
  </AppFormObject>
</form>
