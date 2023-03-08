<script lang="ts">
  import Form from "$lib/form";
  import FormModal from "$lib/modal/FormModal.svelte";
  import { Button, El, Fieldset, Icon } from "@ubeac/svelte";

  export let editing: boolean = false;
  export let values: any = {
    columns: [],
  };

  const columnTypes = ["string", "number", "id", "date", "boolean", "---"];
</script>

<FormModal title="Add Table" bind:values let:form>
  {#if editing}
    <Form.Input name="type" type="hidden" value="edit-table" />
  {:else}
    <Form.Input name="type" type="hidden" value="add-table" />
  {/if}
  <Form.Input name="name" placeholder="Table name..." />

  <Form.Array name="columns" row let:item let:id>
    <Form.Input
      placeholder="Enter Column name..."
      name="name"
      col="6"
      required
    />
    <Form.Select
      placeholder="Select Column type..."
      name="type"
      col="5"
      items={columnTypes}
    />
    <El col="1">
      <Button w="100" color="danger" on:click={() => item.remove(id)}>
        <Icon name="minus" />
      </Button>
    </El>
  </Form.Array>

  <Button
    my="2"
    color="primary"
    on:click={() => form.fields["columns"].insert()}
  >
    <Icon name="plus" />
    Add Column
  </Button>

  <El slot="actions" class="btn-list">
    <Button type="reset">Cancel</Button>
    <Button type="submit" color="primary">Submit</Button>
  </El>
</FormModal>

<!-- 
<AppFormArray bind:value={values.columns} name="columns" let:item let:index>
  <El mb="2" row>
    <Input
      name="name"
      placeholder="Column name..."
      col="5"
      bind:value={values.columns[index].name}
    />
    <AppSelect
      name="type"
      placeholder="Choose a column type..."
      col="5"
      bind:value={values.columns[index].type}
    />
    <Button col="2" on:click={() => form["columns"].remove(index)}>
      <Icon name="minus" />
    </Button>
  </El>
</AppFormArray>
<Button on:click={() => form["columns"].insert()}>
  <Icon name="plus" />
</Button> -->
