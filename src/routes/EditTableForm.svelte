<script lang="ts">
  import Form from "$lib/form";
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
</script>

<FormModal title="Add Table" let:form>
  <Form.Input name="type" type="hidden" value="add-table" />
  <Form.Input name="name" placeholder="Table name..." />

  <Form.Array name="columns" row let:item>
    <Form.Input name="name" col="6" required />
    <Form.Select name="type" col="5" items={columnTypes} />
    <El col="1">
      <Button w="100" color="danger" on:click={() => item.remove()}>
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

  <El p="2">
    <Button on:click={addColumn} color="primary">Add Column</Button>
  </El>

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
