<!--  -->
<script lang="ts">
  import { FormField } from "@ubeac/svelte";
  import { getContext, onDestroy, onMount } from "svelte";

  import type { FormContext } from "./Form.types";

  export let name: string | undefined = undefined;

  export let value: any | undefined = undefined;

  export let state: "valid" | "invalid" | undefined = undefined;
  export let hint: string | undefined = undefined;

  export let validate: (value: any) => Promise<any> = async (value) => value;

  async function validation(throwError: boolean = false) {
    try {
      state = undefined;
      hint = "";

      const result = await validate(value);
      return result;
    } catch (err: any) {
      console.log("wil throw error", err.message, throwError);
      state = "invalid";
      hint = err.message;
      if (throwError) throw err;
    }
  }

  export let set = function (newValue: any) {
    value = newValue;
  };

  export let reset = function () {
    value = undefined;
    hint = undefined;
    state = undefined;
  };

  export let ctx: Record<string, any> = {};

  const { register, unregister, dirty } = getContext<FormContext>("FORM");

  onMount(() => {
    if (name) {
      register(name, { ...ctx, validate: validation, set, reset });
    }
  });
  onDestroy(() => {
    if (name) {
      unregister(name);
    }
  });

  $: {
    value;
    if ($dirty) {
      validation();
    }
  }
  $: set(value);
</script>

<FormField {hint} {state} {...$$restProps}>
  <slot {value} {set} />
</FormField>
