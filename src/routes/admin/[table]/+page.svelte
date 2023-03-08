<script lang="ts">
  import AppDataTable from "$lib/data-table/AppDataTable.svelte";
  import { page } from "$app/stores";
  import type {
    DataTableActions,
    DataTableHeader,
  } from "$lib/data-table/DataTable.types";
  import { onMount, type SvelteComponent } from "svelte";
  import PageHeader from "$lib/layout/PageHeader.svelte";
  import { Button, Icon } from "@ubeac/svelte";
  import { modal } from "$lib/modal/store";
  import { BaseService } from "$lib/service/base/BaseService";
  import FormService from "$lib/common/FormService.svelte";
  import ConfirmModal from "$lib/modal/ConfirmModal.svelte";

  let tableEl: SvelteComponent;
  let headers: DataTableHeader[] = [];

  const service = new BaseService(`/${$page.params.table}`);

  let actions: DataTableActions<any> = {
    text: "Actions",
    buttons: (item) => [
      {
        icon: "trash",
        onClick: () => {
          removeItem(item);
        },
      },
      {
        icon: "pencil",
        onClick: () => {
          editItem(item);
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

  async function editItem(item: any) {
    const result = await modal.open(FormService, {
      //
    });
    if (result) {
      await service.update(item.id, result);
      tableEl.reload();
    }
  }

  async function removeItem(item: any) {
    const choice = await modal.open(ConfirmModal);
    if (choice) {
      await service.remove(item.id);
      tableEl.reload();
    }
  }

  async function createItem() {
    const result = await modal.open(FormService);
    if (result) {
      await service.insert(result);
      tableEl.reload();
    }
  }

  onMount(() => {
    reload();
  });
</script>

<PageHeader title={$page.params.table}>
  <Button color="primary" on:click={createItem}>
    <Icon name="plus" />
    Add
  </Button>
</PageHeader>
{#key $page.params.table}
  <AppDataTable
    bind:this={tableEl}
    headerMode="filters"
    footerMode="pagination"
    {service}
    {headers}
    {actions}
  />
{/key}
