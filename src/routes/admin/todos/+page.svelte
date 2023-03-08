<script lang="ts">
  import AppDataTable from "$lib/data-table/AppDataTable.svelte";
  import DataTable from "$lib/data-table/DataTable.svelte";
  import { TodoService } from "$lib/service";
  import { Badge, Button, Card, El, Icon, Spinner } from "@ubeac/svelte";

  let headers = [
    {
      text: "ID",
      key: "id",
    },
    {
      text: "Title",
      key: "title",
      type: "text",
    },
    {
      text: "Status",
      key: "status",
      type: "select",
      items: ["Active", "Inactive"],
      component: Badge,
      props: (item: any) => ({
        slot: item.status,
        color: item.status === "active" ? "green" : "red",
      }),
    },
    {
      text: "Tags",
      key: "tags.name",
      type: "text",
      component: TagList,
      props: (item: any) => ({
        items: item.tags.map((tag) => tag.name),
        color: item.status === "active" ? "green" : "red",
      }),
    },
  ];

  let items = [
    { id: 1, title: "Hello", status: "active", tags: [{ name: "tag2" }] },
    {
      id: 2,
      title: "Hi",
      status: "active",
      tags: [{ name: "hitag1" }, { name: "tag2" }],
    },
    {
      id: 3,
      title: "Test",
      status: "inactive",
      tags: [{ name: "test" }, { name: "tag1" }, { name: "tag2" }],
    },
    {
      id: 4,
      title: "Another",
      status: "inactive",
      tags: [{ name: "another" }, { name: "tag2" }],
    },
    { id: 5, title: "Hello", status: "active", tags: [] },
  ];
  function addRow() {
    items = [
      ...items,
      {
        id: items.length + 1,
        title: "todo #" + (items.length + 1),
        status: "active",
        tags: ["Hi"],
      },
    ];
  }

  let selected: any[] = [];

  let filters: string[] = [];
</script>

<El p="3">
  <El d="flex" mb="3" justifyContent="between" alignItems="center">
    <El tag="h1">Todos</El>
    <Button color="primary" on:click={console.log}>
      <Icon name="plus" /> Add
    </Button>
  </El>
  <AppDataTable service={TodoService} {headers} bind:filters bind:selected />
</El>
