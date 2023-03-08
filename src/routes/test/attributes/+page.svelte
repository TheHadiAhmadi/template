<script lang="ts">
  import { BaseService } from "$lib/service/Services";
  import AppDataTable from "$lib/data-table/AppDataTable.svelte";
  import type {
    DataTableActions,
    DataTableHeader,
  } from "$lib/data-table/DataTable.types";
  import AppPage from "$lib/layout/AppPage.svelte";
  import PageHeader from "$lib/layout/PageHeader.svelte";
  import { modal } from "$lib/modal/store";
  import { Button, Icon } from "@ubeac/svelte";
  import { onMount, type SvelteComponent } from "svelte";
  import ConfirmRemove from "../../../lib/modal/ConfirmModal.svelte";
  import FormService from "../../../lib/common/FormService.svelte";

  let table: SvelteComponent;

  type AttributeOption = {
    id: number;
    value: string;
  };

  type Attribute = {
    id: number;
    name: string;
    display_name: string;
    type: "enum" | string;
    display_type: "enum" | string;
    options: AttributeOption[];
  };

  const apiURL = "https://test-db-12345.vercel.app";

  let AttributeModal: any | null = null;

  async function getSchema(tableName: string) {
    const data = await fetch(apiURL + "/schema", {
      method: "POST",
    }).then((res) => res.json());

    return data[tableName];
  }

  function getLabel(text: string) {
    return text
      .split("_")
      .map((splitted) => splitted[0].toUpperCase() + splitted.slice(1))
      .join(" ");
  }

  // columns = [];

  // Object.keys(tableObject).map((key) => {
  //   columns.push({
  //     name: key,
  //     type: tableObject[key],
  //   });
  // });
  // columns = columns;

  // tablesObject = data;
  // tables = Object.keys(data).map((table) => {
  //   return {
  //     href: "/admin/" + table,
  //     name: table[0].toUpperCase() + table.slice(1),
  //     value: table,
  //   };
  // });

  const service = new BaseService("/attributes");

  let schema: any;

  let headers: DataTableHeader[] = [];

  function loadHeaders() {
    headers = Object.keys(schema).map((key) => {
      return {
        type: getLabel(schema[key]),
        text: key,
        key: key,
      };
    });
  }

  let actions: DataTableActions<Attribute> = {
    text: "Actions",
    buttons: (item: Attribute) => [
      {
        icon: "pencil",
        async onClick() {
          const result = await AttributeModal.open({
            title: "Edit Attribute",
            values: item,
          });

          if (result) {
            await service.update(item.id, result);
            table.reload();
          }
        },
      },
      {
        icon: "trash",
        props: {
          color: "danger",
        },
        async onClick() {
          const result = await modal.open(ConfirmRemove);

          if (result) {
            await service.remove(item.id);
            table.reload();
          }
        },
      },
    ],
  };

  async function addAttribute() {
    const result = await AttributeModal.open({
      title: "Add Attribute",
    });

    if (result) {
      await service.insert(result);
      table.reload();
    }
  }

  onMount(async () => {
    schema = await getSchema("attributes");
    AttributeModal = modal.create(FormService, { schema });

    loadHeaders();
  });
</script>

<AppPage>
  <PageHeader title={"Attributes"}>
    <Button on:click={addAttribute} color="primary">
      <Icon name="plus" />
      Add Attribute
    </Button>
  </PageHeader>
  <AppDataTable bind:this={table} {service} {headers} {actions} />
</AppPage>
