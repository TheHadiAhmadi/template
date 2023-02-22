<script lang="ts">
  import { FormField, Select } from "@ubeac/svelte";
  import type { FormSelectProps } from "@ubeac/svelte";
  import { getContext, onDestroy, onMount } from "svelte";
  import type { FormContext } from "./Form.types";
  import { get_current_component } from "svelte/internal";
  import * as yup from "yup";

  type $$Props = FormSelectProps & {
    name?: string;
    getKey?: (item: any) => string;
    getText?: (item: any) => string;
  };

  export let multiple: boolean = false;
  export let name: string | undefined = undefined;
  export let hint: string | undefined = undefined;
  export let state: "invalid" | "valid" | undefined = undefined;
  export let label: string | undefined = undefined;
  export let value: any | any[] = multiple ? [] : undefined;
  export let required: boolean = false;
  export let items: any[] = [];
  export let placeholder: string | undefined = undefined;
  export let getKey: (item: any) => string = (item) => item;
  export let getText: (item: any) => string = (item) => item;

  let schema: yup.Schema;

  const { register, unregister, errors, dirty }: FormContext =
    getContext("FORM");
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
    function isNumber() {
      return items.length > 0
        ? !isNaN(Number(getKey(items[0])))
          ? true
          : false
        : false;
    }

    if (multiple) {
      if (isNumber()) {
        schema = yup.array(yup.number());
      } else {
        schema = yup.array(yup.string());
      }
    } else {
      if (isNumber()) {
        schema = yup.number();
      } else {
        schema = yup.string();
      }
    }

    if (required) {
      schema = schema.required(errors.required());
    } else {
      schema = schema.optional();
    }
  }

  export function validate(throwError: boolean = false) {
    getSchema();
    try {
      if (value === null) value = undefined;

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

  export function reset() {
    state = undefined;
    hint = undefined;
    value = multiple ? [] : undefined;
  }

  $: {
    value;
    if ($dirty) {
      validate();
    }
  }
</script>

<FormField {required} {label} {hint} {state}>
  {#if multiple}
    <select
      multiple
      {...$$restProps}
      class="u-select"
      class:u-select-state-valid={state === "valid"}
      class:u-select-state-invalid={state === "invalid"}
      bind:value
    >
      {#if placeholder}
        <option value={undefined} selected disabled>{placeholder}</option>
      {/if}
      {#each items as item}
        <option value={getKey(item)}>
          {getText(item)}
        </option>
      {/each}
    </select>
  {:else}
    <select
      {...$$restProps}
      class="u-select"
      class:u-select-state-valid={state === "valid"}
      class:u-select-state-invalid={state === "invalid"}
      bind:value
    >
      {#if placeholder}
        <option value={null} selected disabled>{placeholder}</option>
      {/if}
      {#each items as item}
        <option value={getKey(item)}>
          {getText(item)}
        </option>
      {/each}
    </select>
  {/if}
</FormField>
