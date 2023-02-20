<script lang="ts">
  import {
    Button,
    El,
    Icon,
    Select,
    Input,
    Menu,
    Card,
    CardBody,
    RadioGroup,
  } from "@ubeac/svelte";
  import { createEventDispatcher } from "svelte";

  export let key: any | undefined = undefined;
  export let label: any | undefined = undefined;
  export let type: any | undefined = "text";
  export let items: any[] = [];

  let text: string | undefined = undefined;
  export let value: any | undefined = undefined;

  let inputValue: string;
  let selectValue: any;
  let operator: any;

  //   or filters..
  $: {
    value = typeof selectValue === "object" ? selectValue.key : selectValue;
    text = typeof selectValue === "object" ? selectValue.text : selectValue;
  }

  $: {
    value = inputValue;
    text = inputValue;
  }

  const dispatch = createEventDispatcher();
  $: {
    if (value) {
      dispatch("change", { key, value, operator });
    }
  }
</script>

<El>
  <Button border>
    <El textMuted>
      {label}:
    </El>
    {#if value}
      {text}
    {:else}
      All
    {/if}
    <Icon pack="mdi" name="chevron-down" />
  </Button>
  <Menu p="2" persistent trigger="click" placement="bottom-start">
    {#if type === "text"}
      <RadioGroup inline items={["Like", "Equal"]} bind:value={operator} />
      <Input placeholder="Type something..." bind:value={inputValue} />
    {:else if type == "select"}
      <Select
        placeholder="Select an option..."
        {items}
        bind:value={selectValue}
      />
    {/if}
  </Menu>
</El>
