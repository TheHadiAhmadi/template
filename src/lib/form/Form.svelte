<script lang="ts">
  import * as yup from "yup";

  import { createEventDispatcher, setContext, SvelteComponent } from "svelte";
  import type { FormContext } from "./Form.types";
  import { writable } from "svelte/store";

  const dispatch = createEventDispatcher();

  const dirty = writable(false);

  let validationErrors: Record<string, string> = {};

  //   let schema: any;

  let components: Record<string, any> = {};
  export let values: any = {};
  export async function validate() {
    // validate all inputs
    dirty.set(true);

    validationErrors = {};
    for (let key of Object.keys(components)) {
      try {
        const result = await components[key].validate(true);
        if (result !== null) {
          values[key] = result;
        }
      } catch (err: any) {
        validationErrors[key] = err.message;
      }
    }
  }

  const register: FormContext["register"] = (name, component) => {
    components[name] = component;
  };

  const unregister: FormContext["unregister"] = (name) => {
    delete components[name];
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
    for (let key of Object.keys(components)) {
      try {
        components[key].reset();
      } catch (err) {
        //
      }
    }
    $dirty = false;
    dispatch("reset");
  }
</script>

<form novalidate on:reset={onReset} on:submit|preventDefault={onSubmit}>
  <slot />
</form>
