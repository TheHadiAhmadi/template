<script lang="ts">
  import AppDataTable from "$lib/AppDataTable.svelte";
  import AppModal from "$lib/AppModal.svelte";
  import AppPage from "$lib/AppPage.svelte";
  import { UserService } from "$lib/BaseService";
  import type { DataTableHeader } from "$lib/data-table/DataTable.types";
  import AppInput from "$lib/form/AppInput.svelte";
  import Form from "$lib/form/Form.svelte";
  import PageHeader from "$lib/PageHeader.svelte";
  import PageTitle from "$lib/PageTitle.svelte";
  import { Button, ButtonGroup, El, Icon } from "@ubeac/svelte";

  let modalOpen = false;

  let headers: DataTableHeader[] = [
    { text: "ID", key: "id" },
    { text: "Name", key: "name" },
    { text: "Email Address", key: "email" },
    { text: "Age", key: "age" },
    {
      text: "Actions",
      sortable: false,
      key: "",
      component: Button,
      props: (item) => ({
        slot: "remove #" + item.id,
        color: "danger",
      }),
    },
  ];

  async function onSubmit({ detail }: CustomEvent<any>) {
    await UserService.insert(detail);
    modalOpen = false;
  }

  function onReset() {}
</script>

<AppPage>
  <PageHeader>
    <PageTitle>Users</PageTitle>
    <Button color="primary" on:click={() => (modalOpen = true)}>
      <Icon name="plus" />
      Add
    </Button>
  </PageHeader>
  <AppDataTable {headers} service={UserService} />
</AppPage>

<Form on:reset={onReset} on:submit={onSubmit}>
  <AppModal bind:open={modalOpen}>
    <El slot="body">
      <AppInput label="Name:" required name="name" />
      <AppInput label="Email:" type="email" name="email" />
      <AppInput label="Age:" name="age" type="number" />
    </El>

    <El slot="footer" d="flex" justifyContent="end" class="btn-list">
      <Button type="reset">Cancel</Button>
      <Button type="submit" color="primary">Add</Button>
    </El>
  </AppModal>
</Form>
