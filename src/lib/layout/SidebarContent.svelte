<script lang="ts">
  import { goto } from "$app/navigation";
  import { modal } from "$lib/modal/store";
  import { Button, El, Icon } from "@ubeac/svelte";
  import { onMount } from "svelte";
  import ConfirmRemove from "../modal/ConfirmModal.svelte";
  import EditTableForm from "$lib/common/EditTableForm.svelte";
  import { API_URL } from "$lib/config";

  export let compactMode: boolean = false;

  let tablesObject: any = {};
  let tables: any[] = [];

  async function runMigration(command: any) {
    try {
      return await fetch(API_URL + "/migrate", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(command),
      }).then((res) => res.json());
    } catch (err) {
      console.log("error: ", err);
    }
  }

  async function addTable({ name, columns }: any) {
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
    try {
      const data = await fetch(API_URL + "/schema", {
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
    } catch (err) {
      console.log("error: ", err);
    }
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
      editing: true,
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
        title: `Confirm remove table`,
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
</script>

<El class="w-240px shrink-0 bg-white" borderEnd {...$$restProps}>
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
      <El>
        <Icon name="table" />
      </El>
      <El if={!compactMode}>
        {table.name}
      </El>

      {#if !compactMode}
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
      {/if}
    </El>
  {/each}
  <El p="2">
    <Button on:click={openAddTableModal} color="primary" w="100">
      <Icon name="plus" />
      <El if={!compactMode}>Add Table</El>
    </Button>
  </El>
</El>
