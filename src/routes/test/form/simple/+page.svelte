<script>
  import { Form, AppInput } from "$lib/form";
  import AppFormArray from "$lib/form/AppFormArray.svelte";
  import AppFormObject from "$lib/form/AppFormObject.svelte";
  import AppSelect from "$lib/form/AppSelect.svelte";

  import { Button, El, Icon } from "@ubeac/svelte";

  function onClick(form, item) {
    console.log(form);
    form.fields["columns"].remove(item);
  }
</script>

<El tag="h1">Only submit</El>
<Form on:submit={(e) => console.log(e.detail)}>
  <Button type="submit">Submit</Button>
</Form>

<El tag="h1">With Input</El>
<Form on:submit={(e) => console.log(e.detail)}>
  <AppInput type="text" name="name" />
  <Button type="submit">Submit</Button>
</Form>

<El tag="h1">With Input and select</El>
<Form on:submit={(e) => console.log(e.detail)}>
  <AppInput type="text" name="name" />
  <AppSelect required name="gender" items={["Male", "Female"]} />
  <Button type="submit">Submit</Button>
</Form>

<El tag="h1">With Nested objects</El>
<Form on:submit={(e) => console.log(e.detail)}>
  <AppFormObject name="test">
    <AppInput required name="field1" />
    <AppInput name="field2" />
    <AppInput required name="field3" />
  </AppFormObject>
  <Button type="submit">Submit</Button>
</Form>

<El tag="h1">With Array</El>

<Form on:submit={(e) => console.log(e.detail)} let:form>
  <AppFormArray row name="columns" let:item>
    <AppInput min={3} requierd col="6" name="name" />
    <AppSelect col="5" name="type" items={["string", "boolean", "number"]} />
    <Button col="1" on:click={() => onClick(form, item)}>
      <Icon name="minus" />
    </Button>
  </AppFormArray>
  <Button on:click={() => form.fields["columns"].insert()}>
    <Icon name="plus" />
  </Button>

  <Button type="submit">Submit</Button>
</Form>
