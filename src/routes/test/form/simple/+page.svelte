<script>
  import Form from "$lib/form";

  import { Button, El, Icon } from "@ubeac/svelte";

  function onClick(form, item) {
    console.log(form);
    form.fields["columns"].remove(item);
  }

  let values = {
    columns: [
      { name: "Hadi", type: "string" },
      { name: "Hadi2", type: "number" },
    ],
  };
</script>

<El tag="h1">Only submit</El>
<Form on:submit={(e) => console.log(e.detail)}>
  <Button type="submit">Submit</Button>
</Form>

<El tag="h1">With Input</El>
<Form on:submit={(e) => console.log(e.detail)}>
  <Form.Input type="text" name="name" />
  <Button type="submit">Submit</Button>
</Form>

<El tag="h1">With Input and select</El>
<Form on:submit={(e) => console.log(e.detail)}>
  <Form.Input type="text" name="name" />
  <Form.Select required name="gender" items={["Male", "Female"]} />
  <Button type="submit">Submit</Button>
</Form>

<El tag="h1">With Nested objects</El>
<Form on:submit={(e) => console.log(e.detail)}>
  <Form.Object name="test">
    <Form.Input required name="field1" />
    <Form.Input name="field2" />
    <Form.Input required name="field3" />
  </Form.Object>
  <Button type="submit">Submit</Button>
</Form>

<El tag="h1">With Array</El>

<Form on:submit={(e) => console.log(e.detail)} let:form bind:values>
  <Form.Array row name="columns" let:item let:id>
    <Form.Input min={3} requierd col="5" name="name" />
    <Form.Select col="5" name="type" items={["string", "boolean", "number"]} />
    <El col="2">
      <Button w="100" on:click={() => item.remove(id)}>
        <Icon name="minus" />
      </Button>
    </El>
  </Form.Array>

  <Button on:click={() => form.fields["columns"].insert()}>
    <Icon name="plus" />
  </Button>

  <Button type="submit">Submit</Button>
</Form>
