<script lang="ts">
  import Form from "$lib/form";
  import FormModal from "$lib/modal/FormModal.svelte";
  import { Button, El } from "@ubeac/svelte";

  export let schema: any = {};

  export let values: any = {};
  export let title: string | undefined = undefined;

  function getLabel(text: string) {
    return text
      .split("_")
      .map((splitted) => splitted[0].toUpperCase() + splitted.slice(1))
      .join(" ");
  }
</script>

<FormModal bind:values {title}>
  {#each [...Object.keys(schema)] as key}
    {#if schema[key] === "string"}
      <Form.Input label={getLabel(key)} required name={key} />
    {:else if schema[key] === "number"}
      <Form.Input label={getLabel(key)} required name={key} type="number" />
      <!-- {:else if(schema[key] === 'array')} -->
      <!-- <Form.Checkboxes name={key}/> -->
    {/if}
  {/each}

  <svelte:fragment slot="actions">
    <Button type="reset">Cancel</Button>
    <Button type="submit" color="primary">Submit</Button>
  </svelte:fragment>
</FormModal>
