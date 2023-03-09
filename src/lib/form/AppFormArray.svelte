<script lang="ts">
  import { El } from "@ubeac/svelte";
  import { onDestroy, getContext, onMount, setContext } from "svelte";
  import AppFormObject from "./AppFormObject.svelte";
  import type { FormContext } from "./Form.types";

  export let value: any[] = [];
  let fields: any = {};

  export let name: string | undefined = undefined;

  let state: "invalid" | "valid" | undefined = undefined;
  let hint: string | undefined = undefined;
  let lastId = 1;
  const nextId = () => lastId++;

  const context = getContext<FormContext>("FORM");

  function register(id: number, ctx: any) {
    fields[id] = ctx;
  }

  function unregister(id: number) {
    delete fields[id];
  }

  setContext("FORM", { ...context, register, unregister });

  const ctx = {
    fields,
    insert: (val: any = {}) => {
      value = [...value, { id: nextId(), value: val }];
    },
    remove: (id: number) => {
      console.log(value, fields, id);
      value = value.filter((val) => val.id !== id);
    },
    async validate(throwError: boolean) {
      try {
        for (let index = 0; index < value.length; index++) {
          console.log(fields, value[index].id, value);
          const result = await fields[value[index].id].validate(throwError);
          if (result) {
            value[index].value = result;
          } else {
            return null;
          }
        }
        return value.map((val) => val.value);
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
      value = val.map((v) => ({
        id: nextId(),
        value: v,
      }));
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

  $: if (value) {
    if (value.length > 0 && !value[0].id) {
      value = value.map((val) => ({ id: nextId(), value: val }));
    }
  }
</script>

<El {...$$restProps}>
  {#each value as val, index (val.id)}
    <AppFormObject name={val.id} bind:value={val.value}>
      <slot item={ctx} id={val.id} />
    </AppFormObject>
  {/each}
</El>
