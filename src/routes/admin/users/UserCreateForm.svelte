<script lang="ts">
  import Form from "$lib/form";
  import FormModal from "$lib/modal/FormModal.svelte";
  import { Button, El } from "@ubeac/svelte";

  type User = {
    id: string;
    name: string;
    email: string;
    age: number;
  };

  export let values: User | undefined = undefined;
</script>

<FormModal bind:values>
  <Form.Input required name="name" label="Name:" />
  <Form.Input required name="email" type="email" label="Email:" />
  <Form.Input name="age" type="number" label="Age:" />

  <El slot="actions" class="btn-list">
    <Button type="reset">Cancel</Button>
    <Button type="submit" color="primary">Submit</Button>
  </El>
</FormModal>
