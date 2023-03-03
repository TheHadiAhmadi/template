<script lang="ts">
  import { getContext, onDestroy, onMount, setContext } from "svelte";
  import type { FormContext } from "./Form.types";

  export let name: string | undefined = undefined;
  export let value: Record<string, any> = {};

  let validationErrors: Record<string, string> = {};

  let fields: any = {};

  const context: FormContext = getContext("FORM");

  const register: FormContext["register"] = (name: string, ctx: any) => {
    fields[name] = ctx;
  };

  const unregister: FormContext["unregister"] = (name: string) => {
    delete fields[name];
  };

  setContext("FORM", { ...context, register, unregister });

  async function validate(throwError: boolean = false) {
    try {
      validationErrors = {};
      let keys = Object.keys(fields);
      if (keys.length === 0) {
        return {};
      }
      for (let key of keys) {
        try {
          const result = await fields[key].validate(true);
          if (result !== null) {
            value[key] = result;
          }
        } catch (err: any) {
          validationErrors[key] = err.message;

          if (throwError) throw err;
        }
      }
      return value;
    } catch (err: any) {
      //
      if (throwError) throw err;
    }
  }

  function reset() {
    for (let key of Object.keys(fields)) {
      fields[key].reset();
    }
  }

  function set(val: Record<string, any> = {}) {
    for (let key of Object.keys(val)) {
      if (typeof val[key] !== "undefined") {
        fields[key].set(val[key]);
      }
    }
  }

  const ctx = {
    fields,
    validate,
    reset,
    set,
  };

  onMount(() => {
    if (name) {
      context.register(name, ctx);
    }
    for (let key of Object.keys(fields)) {
      if (typeof value[key] !== "undefined") {
        fields[key].set(value[key]);
      }
    }
  });
  onDestroy(() => {
    if (name) {
      context.unregister(name);
    }
  });
</script>

<slot />

<!-- 

<script lang="ts">
    import * as yup from "yup";
  
    import {
      createEventDispatcher,
      onMount,
      setContext,
      SvelteComponent,
    } from "svelte";
    import type { FormContext } from "./Form.types";
    import { writable } from "svelte/store";
    import AppFormObject from "./AppFormObject.svelte";
  
    const dispatch = createEventDispatcher();
  
    const dirty = writable(false);
  
    let validationErrors: Record<string, string> = {};
  
    //   let schema: any;
  
    let components: Record<string, any> = {};
    export let values: any = {};
    
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
      for (let key of Object.keys(form)) {
        try {
          form[key].reset();
        } catch (err) {
          //
        }
      }
      $dirty = false;
      dispatch("reset");
    }
  
    onMount(() => {
    });
  </script>
  
  <form novalidate on:reset={onReset} on:submit|preventDefault={onSubmit}>
    <AppFormObject>
      <slot {form} />
    </AppFormObject>
  </form>
   -->
