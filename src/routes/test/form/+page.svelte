<script lang="ts">
  import { Form, AppInput } from "$lib/form";
  import AppCheckboxes from "$lib/form/AppCheckboxes.svelte";
  import AppRadios from "$lib/form/AppRadios.svelte";
  import AppSelect from "$lib/form/AppSelect.svelte";
  import { Button } from "@ubeac/svelte";

  function onSubmit({ detail }: CustomEvent) {
    console.log(detail);
  }

  let values = {
    name: "",
    email: "",
    age: 0,
  };
</script>

<Form on:submit={onSubmit}>
  <AppInput
    bind:value={values.name}
    pattern={/\w+/}
    label="Name:"
    required
    name="name"
  />
  <AppInput
    bind:value={values.email}
    type="email"
    label="Email:"
    name="email"
  />
  <AppSelect
    items={[
      { text: "male", key: 3 },
      { text: "female", key: 4 },
    ]}
    getKey={(item) => item.key}
    getText={(item) => item.text}
    placeholder="select gender"
    label="gender"
    name="gender"
  />

  <AppCheckboxes
    items={["HTML", "CSS", "JS", "Svelte"]}
    required
    min={3}
    max={4}
    name="language"
  />
  <AppInput bind:value={values.age} min={18} type="number" name="age" />

  <AppRadios
    label="Gender: "
    name="gender2"
    required
    items={[
      { key: 1, text: "Male" },
      { key: 2, text: "Female" },
    ]}
    getText={(item) => item.text}
    getKey={(item) => item.key}
  />
  <Button type="submit" color="primary">Submit</Button>
  <Button type="reset">Reset</Button>
</Form>

{JSON.stringify(values)}
