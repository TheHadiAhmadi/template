<script lang="ts">
  import "virtual:windi.css";
  import "@ubeac/svelte/styles/tabler.css";
  import ModalProvider from "$lib/modal/ModalProvider.svelte";
  import { Button, El, Icon } from "@ubeac/svelte";
  import { goto } from "$app/navigation";
  import { modal } from "$lib/modal/store";
  import EditTableForm from "./EditTableForm.svelte";
  import { onMount } from "svelte";
  import ConfirmRemove from "./ConfirmRemove.svelte";

  const apiURL = "https://test-db-12345.vercel.app";

  let tablesObject: any = {};

  async function runMigration(command: any) {
    return await fetch(apiURL + "/migrate", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(command),
    }).then((res) => res.json());
  }

  async function addTable({ name, columns }: any) {
    //
    console.log("add migration");
    return await runMigration({
      type: "add-table",
      name,
      columns,
    });
  }

  async function renameTable(from: string, to: string) {
    return await runMigration({
      type: "remane-table",
      from,
      to,
    });
  }
  async function removeTable(name: string) {
    return await runMigration({
      type: "remove-table",
      name,
    });
  }

  async function reload() {
    //
    const data = await fetch(apiURL + "/schema", {
      method: "POST",
    }).then((res) => res.json());

    tablesObject = data;
    tables = Object.keys(data).map((table) => {
      return {
        href: "/admin/" + table,
        name: table[0].toUpperCase() + table.slice(1),
        value: table,
      };
    });
  }

  async function openAddTableModal() {
    const data = await modal.open(EditTableForm, {
      values: { name: "", columns: [] },
    });
    await addTable(data);
    reload();
  }

  async function openEditTableModal(tableName: string) {
    const name = tableName;
    const columns = Object.keys(tablesObject[tableName]).map((key) => {
      return {
        name: key,
        type: tablesObject[tableName][key],
      };
    });

    const values = { name, columns };
    const data = await modal.open(EditTableForm, {
      values,
    });
    if (data.name !== name) {
      await renameTable(name, data.name);
      reload();
    }
  }

  async function openRemoveTableModal(tableName: string) {
    try {
      const result = await modal.open(ConfirmRemove, {
        title: `Conirm remove table`,
        description: `Are you sure to remove ${tableName} table?`,
      });
      if (result) {
        await removeTable(tableName);
        reload();
      } else {
        // clicked on No
      }
    } catch (err) {
      // modal closed
    }
  }

  onMount(() => {
    reload();
  });

  let tables: any[] = [];
</script>

<El class="h-full" d="flex">
  <El class="w-200px" borderEnd bgColor="light" bgOpacity="50">
    <El p="3" class="text-xl font-bold bg-white" borderBottom>DataBase</El>
    {#each tables as table}
      <El
        on:click={() => goto(table.href)}
        px="3"
        py="2"
        d="flex"
        justifyContent="between"
        borderBottom
        class="hover:bg-gray-200 cursor-pointer"
      >
        <span>
          {table.name}
        </span>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="flex gap-2" on:click|stopPropagation>
          <Button on:click={() => openEditTableModal(table)} size="sm">
            <Icon name="pencil" />
          </Button>

          <Button
            on:click={() => openRemoveTableModal(table.value)}
            color="danger"
            size="sm"
          >
            <Icon name="trash" />
          </Button>
        </div>
      </El>
    {/each}
    <El p="2">
      <Button on:click={openAddTableModal} color="primary" w="100">
        <Icon name="plus" />
        Add Table
      </Button>
    </El>
  </El>
  <El class="flex-1">
    <slot />
  </El>
</El>

<ModalProvider />

<style>
  :global(.u-body-dialog-open) {
    padding-right: 16px;
  }
</style>
