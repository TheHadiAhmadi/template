<script lang="ts">
  import AppDataTable from "$lib/data-table/AppDataTable.svelte";
  import AppPage from "$lib/layout/AppPage.svelte";
  import { UserService } from "$lib/BaseService";
  import type {
    DataTableActions,
    DataTableHeader,
  } from "$lib/data-table/DataTable.types";
  import { Button, ButtonGroup, El, Icon } from "@ubeac/svelte";
  import UserCreateForm from "./UserCreateForm.svelte";
  import { modal } from "$lib/modal/store";
  import ConfirmRemove from "../../ConfirmRemove.svelte";
  import PageHeader from "$lib/layout/PageHeader.svelte";
  import PageTitle from "$lib/layout/PageTitle.svelte";

  type User = {
    id: string;
    name: string;
    email: string;
    age: number;
  };

  let table: any;

  let headers: DataTableHeader[] = [
    { text: "ID", key: "id" },
    { text: "Name", key: "name" },
    { text: "Email Address", type: "text", key: "email" },
    { text: "Age", key: "age", type: "number" },
  ];

  let actions: DataTableActions<User> = {
    text: "Actions",
    type: "list",
    buttons: (user) => [
      {
        text: "Remove",
        props: {
          color: "danger",
        },
        onClick: removeUser,
      },
      {
        text: "Edit",
        onClick: updateUser,
      },
    ],
  };

  async function removeUser(user: User) {
    const result = await modal.open(ConfirmRemove, {
      title: "Confirm remove User",
      description: `Are you sure to remove ${user.name} from users list?`,
    });

    if (result) {
      await UserService.remove(user.id);
      table.reload();
    }
  }

  async function updateUser(user: User) {
    const updatedUser = await modal.open(UserCreateForm, {
      values: user,
    });

    if (updatedUser) {
      await UserService.update(user.id, updatedUser);
      table.reload();
    }
  }

  async function createUser() {
    const result = await modal.open(UserCreateForm, {}, { size: "full" });
    if (result) {
      await UserService.insert(result);
      table.reload();
    }
  }
</script>

<AppPage>
  <PageHeader>
    <PageTitle>Users</PageTitle>
    <Button color="primary" on:click={createUser}>
      <Icon name="plus" />
      Add
    </Button>
  </PageHeader>
  <AppDataTable
    bind:this={table}
    {actions}
    {headers}
    headerMode="filters"
    service={UserService}
  />
</AppPage>
