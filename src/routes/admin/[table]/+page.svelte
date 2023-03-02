<script lang="ts">
  import AppDataTable from "$lib/data-table/AppDataTable.svelte";
  import { page } from "$app/stores";
  import type {
    DataTableActions,
    DataTableHeader,
  } from "$lib/data-table/DataTable.types";
  import { onMount } from "svelte";
  import { BaseService } from "$lib/BaseService";
  import AppPage from "$lib/layout/AppPage.svelte";
  import PageHeader from "$lib/layout/PageHeader.svelte";
  import PageTitle from "$lib/layout/PageTitle.svelte";
  import { Button, Icon } from "@ubeac/svelte";
  import { modal } from "$lib/modal/store";
  import UserCreateForm from "../users/UserCreateForm.svelte";

  let headers: DataTableHeader[] = [];

  const service = new BaseService(`/${$page.params.table}`);

  let actions: DataTableActions<any> = {
    text: "Actions",
    buttons: () => [
      {
        icon: "trash",
        onClick: () => {
          console.log("remove");
        },
      },
      {
        icon: "pencil",
        onClick: () => {
          console.log("edit");
        },
      },
      {
        icon: "eye",
        onClick: () => {
          console.log("preview");
        },
      },
    ],
  };

  const apiURL = "https://test-db-12345.vercel.app";

  async function reload() {
    //
    const data = await fetch(apiURL + "/schema", {
      method: "POST",
    }).then((res) => res.json());

    headers = Object.keys(data[$page.params.table]).map((key) => {
      const column = data[$page.params.table];
      console.log(column);
      return {
        type: column[key],
        text: key,
        key: key,
      };
    });
  }

  function openCreateItem() {
    modal
      .open(UserCreateForm, {
        onSubmit: console.log,
        onReset: modal.close,
      })
      .show();
  }

  onMount(() => {
    reload();
  });
</script>

<AppPage>
  <PageHeader>
    <PageTitle>{$page.params.table}</PageTitle>
    <Button color="primary" on:click={openCreateItem}>
      <Icon name="plus" />
      Add
    </Button>
  </PageHeader>
  {#key $page.params.table}
    <AppDataTable
      headerMode="filters"
      footerMode="pagination"
      {service}
      {headers}
      {actions}
    />
  {/key}
</AppPage>
