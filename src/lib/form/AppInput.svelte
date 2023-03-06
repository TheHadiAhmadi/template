<script lang="ts">
  import { FormField, Input } from "@ubeac/svelte";
  import { onMount, onDestroy, getContext } from "svelte";
  import type { FormContext } from "./Form.types";
  import * as yup from "yup";
  import type { InputProps } from "@ubeac/svelte/components/Input/Input.svelte";
  import AppFormField from "./AppFormField.svelte";

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
  export let updateSchema: (schema: yup.Schema) => yup.Schema = (schema) =>
    schema;
  export let type:
    | "text"
    | "number"
    | "email"
    | "tel"
    | "password"
    | "hidden"
    | undefined = undefined;

  let state: "invalid" | "valid" | undefined = undefined;
  let hint: string | undefined = undefined;

  let schema: yup.NumberSchema | yup.StringSchema | any;

  const { errors } = getContext<FormContext>("FORM");

  // onMount(() => {
  //   if (name) {
  //     register(name, { set, reset, validate });
  //   }
  // });

  // onDestroy(() => {
  //   if (name) {
  //     unregister(name);
  //   }
  // });

  // function set(val: any) {
  //   value = val;
  // }

  function getSchema(): yup.Schema {
    let schema;
    if (type !== "number") {
      schema = yup.string().typeError(errors.string());

      if (min) {
        schema = schema.min(min, errors.min_string(min));
      }
      if (max) {
        schema = schema.max(max, errors.max_string(max));
      }

      if (type === "email") {
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

    schema = updateSchema(schema);

    return schema;
  }

  // function reset() {
  //   state = undefined;
  //   hint = undefined;
  //   value = undefined;
  // }

  // function onChange(event: any) {
  //   value = event?.target.value;
  // }

  function validate(value: any) {
    const schema = getSchema();
    const result = schema.validateSync(value);

    return result;
  }

  $: if (!value) {
    value = "";
  }

  $: console.log(value);
</script>

<AppFormField {state} {hint} {name} {validate} {...$$restProps} bind:value>
  <Input {...$$restProps} {required} {min} {max} {type} {state} bind:value />
</AppFormField>
<!-- on:input={(e) => {
      console.log('onInput', e)
      value = e.target.value;
    }} -->
<!-- class="u-input" -->
<!-- class:u-input-state-invalid={state === "invalid"}
  class:u-input-state-valid={dirty && state === "valid"} -->
<!-- 
<FormField {required} {min} {max} {label} {col} bind:state bind:hint>
</FormField> -->
