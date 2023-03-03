<script lang="ts">
  import { El, FormField } from "@ubeac/svelte";
  import { onDestroy, getContext, onMount, setContext } from "svelte";
  import AppFormObject from "./AppFormObject.svelte";
  import type { FormContext } from "./Form.types";

  export let value: any[] = [];
  let fields: any[] = [];

  export let name: string | undefined = undefined;

  let state: "invalid" | "valid" | undefined = undefined;
  let hint: string | undefined = undefined;

  const context = getContext<FormContext>("FORM");

  function register(index: number, ctx: any) {
    fields = [...fields, ctx];
  }

  function unregister(item: any) {
    fields = fields.filter((field) => field !== item);
  }

  setContext("FORM", { ...context, register, unregister });

  const ctx = {
    fields,
    insert: (val: any = {}) => {
      value = [...value, val];
    },
    remove: (index: number) => {
      value = value.filter((_, i) => index !== i);
    },
    async validate(throwError: boolean) {
      try {
        for (let index = 0; index < value.length; index++) {
          const result = await fields[index].validate();
          if (result) {
            value[index] = result;
          } else {
            return null;
          }
        }
        return value;
      } catch (err) {
        console.log("catch: ", err);
        //
        state = "invalid";
        if (throwError) throw err;
      }
    },
    reset() {
      //   values = [];
      try {
        for (let field of fields) {
          field.reset();
        }
      } catch (err) {
        //
      }
    },
    set(val: any[]) {
      value = val;
    },
  };

  onMount(() => {
    if (name) {
      context.register(name, ctx);
    }
  });

  onDestroy(() => {
    if (name) {
      context.unregister(name);
    }
  });
</script>

<El {...$$restProps}>
  {#each value as val, index}
    <AppFormObject name={index.toString()} bind:value={val}>
      <slot item={fields[index]} {index} />
    </AppFormObject>
  {/each}
</El>
