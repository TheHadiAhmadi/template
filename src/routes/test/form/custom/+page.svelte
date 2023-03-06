<script lang="ts">
  import Form from "$lib/form";
  import { Button, Fieldset } from "@ubeac/svelte";

  function onSubmit(event: CustomEvent<any>) {
    console.log(event.detail);
  }

  let values = {
    rows: [{ test: 1 }, { test: 3 }, { test: 5 }],
  };
</script>

{JSON.stringify(values)}

<Fieldset>
  <Form bind:values on:submit={onSubmit}>
    <Form.Input name="Email" type="email" required/>
    <Form.Field name="custom" let:value let:set bind:value={values.custom}>
      <input {value} on:input={(e) => set(e.target.value)} />
    </Form.Field>
    <Form.Array name="rows">
      <Form.Input type="number" name="test" />
    </Form.Array>

    <Button type="submit">Submit</Button>
  </Form>
</Fieldset>
