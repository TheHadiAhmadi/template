<script lang="ts">
  import DataTable from "$lib/DataTable.svelte";
  import { Badge, Button, Card, El, Icon, Spinner } from "@ubeac/svelte";
  import TagList from "$lib/TagList.svelte";

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
  <Card>
    <DataTable
      {items}
      {headers}
      footerMode="pagination"
      headerMode="filters"
      defaultFilters={[{ key: "name", value: "hadi", operator: "like" }]}
      bind:filters
      bind:selected
    >
      <El
        d="flex"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        w="100"
        h="100"
        bgColor="light"
        bgOpacity="75"
        slot="loading"
      >
        <Spinner />
      </El>
      <El slot="header" d="flex" justifyContent="between">
        <El>Header</El>
        <El class="btn-list">
          <Button on:click={addRow} size="sm" color="primary">Add Row</Button>
          <Button size="sm">TEST</Button>
        </El>
      </El>
    </DataTable>
  </Card>
</El>
