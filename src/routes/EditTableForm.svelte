<script lang="ts">
  import AppInput from "$lib/form/AppInput.svelte";
  import AppSelect from "$lib/form/AppSelect.svelte";
  import FormModal from "$lib/modal/FormModal.svelte";
  import { Button, ButtonGroup, El, Icon, Input } from "@ubeac/svelte";
  import { createEventDispatcher } from "svelte";

  export let values: any = {
    columns: [],
  };

  //   let name: string | undefined = undefined;
  //   let columns: any[] = [];

  const columnTypes = ["string", "number", "id", "date", "boolean", "---"];

  const addColumn = () => {
    values.columns = [...(values.columns ?? []), { name: "", type: "" }];
  };

  const removeColumn = (index: number) => {
    values.columns = (values.columns ?? []).filter((col, i) => i !== index);
  };

  const dispatch = createEventDispatcher();
  // function onSubmit({ detail }: CustomEvent<any>) {
  //   console.log(detail);
  //   dispatch("submit", values);
  // }
</script>

<FormModal title="Add Table">
  <AppInput type="hidden" name="type" value="add-table" />
  <AppInput placeholder="Table name..." name="name" bind:value={values.name} />

  {#each values.columns ?? [] as column, index}
    <El mb="2" row>
      <El col="5">
        <Input placeholder="Column name..." col="5" bind:value={column.name} />
      </El>
      <El col="5">
        <AppSelect
          placeholder="Choose a column type..."
          items={columnTypes}
          col="5"
          bind:value={column.type}
        />
      </El>
      <El col="2">
        <Button color="danger" on:click={() => removeColumn(index)} w="100">
          <Icon name="minus" />
        </Button>
      </El>
    </El>
  {/each}
  <El p="2">
    <Button on:click={addColumn} color="primary">
      <Icon name="plus" />
      Add Column
    </Button>
  </El>

  <El slot="actions" class="btn-list">
    <Button type="reset">Cancel</Button>
    <Button type="submit" color="primary">Submit</Button>
  </El>
</FormModal>
