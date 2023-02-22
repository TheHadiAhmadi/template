<script lang="ts">
  import { FormField } from "@ubeac/svelte";
  import { onMount, onDestroy, getContext } from "svelte";
  import { get_current_component } from "svelte/internal";
  import type { FormContext } from "./Form.types";
  import * as yup from "yup";

  type Validator = {
    type: string;
    params: any[];
  };

  export let value: any | undefined = undefined;

  export let name: string | undefined = undefined;
  export let min: number | undefined = undefined;
  export let max: number | undefined = undefined;
  export let required: boolean | undefined = undefined;
  export let pattern: string | RegExp | undefined = undefined;
  export let label: string | undefined = undefined;
  export let validators: Validator[] = [];
  export let type:
    | "text"
    | "number"
    | "email"
    | "tel"
    | "password"
    | undefined = undefined;

  let state: "invalid" | "valid" | undefined = undefined;
  let hint: string | undefined = undefined;

  let schema: yup.NumberSchema | yup.StringSchema | any;

  const { unregister, register, dirty, errors } =
    getContext<FormContext>("FORM");
  const component = get_current_component();

  onMount(() => {
    if (name) {
      register(name, component);
    }
  });

  onDestroy(() => {
    if (name) {
      unregister(name);
    }
  });

  function getSchema() {
    if (type !== "number") {
      schema = yup.string().typeError(errors.string());

      if (min) {
        schema = schema.min(min, errors.min_string(min));
      }
      if (max) {
        schema = schema.max(max, errors.max_string(max));
      }

      if (type === "email") {
        // console.log("email");
        schema = schema.email(errors.email(value));
      }

      if (pattern) {
        schema = schema.matches(
          new RegExp(pattern),
          errors.pattern(pattern.toString())
        );
      }
    } else {
      schema = yup.number().typeError(errors.number());
      if (min) {
        schema = schema.min(min, errors.min_number(min));
      }
      if (max) {
        schema = schema.max(max, errors.max_number(max));
      }
    }

    if (required) {
      schema = schema.required(errors.required());
    } else {
      schema = schema.optional();
    }

    if (validators?.length) {
      for (let validator of validators) {
        schema = schema[validator.type]?.(...validator["params"]);
      }
    }

    return schema;
  }

  export function reset() {
    state = undefined;
    hint = undefined;
    value = undefined;
  }

  export function validate(throwError: boolean = false) {
    try {
      getSchema();
      const result = schema.validateSync(value);

      state = "valid";
      hint = "";
      return result;
    } catch (err: any) {
      state = "invalid";
      hint = err.message;
      if (throwError) throw err;
    }
  }

  $: {
    value;
    if ($dirty) {
      validate();
    }
  }
</script>

<FormField {required} {min} {max} {label} bind:state bind:hint>
  <input
    {...$$restProps}
    {required}
    {min}
    {max}
    class="u-input"
    class:u-input-state-invalid={state === "invalid"}
    class:u-input-state-valid={dirty && state === "valid"}
    bind:value
  />
</FormField>
