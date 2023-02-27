<script lang="ts">
  import AppDataTable from "$lib/data-table/AppDataTable.svelte";
  import AppPage from "$lib/AppPage.svelte";
  import { UserService } from "$lib/BaseService";
  import type { DataTableHeader } from "$lib/data-table/DataTable.types";
  import { Button, ButtonGroup, El, Icon } from "@ubeac/svelte";
  import UserCreateForm from "./UserCreateForm.svelte";
  import { modal } from "$lib/modal/store";
  import ConfirmRemove from "./ConfirmRemove.svelte";
  import PageHeader from "$lib/PageHeader.svelte";
  import PageTitle from "$lib/PageTitle.svelte";
  import NewCollection from "./NewCollection.svelte";

  let table: any;

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
    table.reload();
    modal.close();
  }

  let selected: any[] = [];
  $: console.log(selected);

  function onRemoveSelected() {
    modal
      .open(NewCollection, {
        description: `Are you sure to remove these ${selected?.length} users?`,
        title: "Confirm remove users",
        async onYes() {
          await Promise.all(
            selected.map((item) => {
              return UserService.remove(item.id);
            })
          );
          table.reload();
          modal.close();
        },
        onNo: modal.close,
      })
      .show();

    modal.close();
  }

  function onRemove(item: any) {
    modal
      .open(ConfirmRemove, {
        async onYes() {
          console.log("REMOVE");
          await UserService.remove(item.id);
          table.reload();
          modal.close();
        },
        onNo() {
          console.log("DONT REMOVE");
          modal.close();
        },
      })
      .show();
    // .on("submit", () => {
    //   console.log("user removed successfully");
    // })
    // .handler();
  }
</script>

<AppPage>
  <PageHeader>
    <PageTitle>Users</PageTitle>
    <Button
      color="primary"
      on:click={modal.open(UserCreateForm, {
        data: {
          name: "Hadi",
          email: "test",
        },
        onSubmit,
        onReset: modal.close,
      }).show}
    >
      <Icon name="plus" />
      Add
    </Button>
    <Button color="danger" on:click={() => onRemove({ id: 1 })}>
      <Icon name="minus" />
      remove #1
    </Button>
    <Button color="danger" on:click={() => onRemoveSelected()}>
      <Icon name="minus" />
      remove Selected Items
    </Button>
  </PageHeader>
  <AppDataTable
    bind:this={table}
    {headers}
    service={UserService}
    bind:selected
  />
</AppPage>
