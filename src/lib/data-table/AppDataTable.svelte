<script lang="ts">
  import { Card, El, Spinner } from "@ubeac/svelte";
  import type { BaseService, IParams, SortParams } from "../BaseService";
  import DataTable from "./DataTable.svelte";
  import type { DataTableActions, DataTableFilter } from "./DataTable.types";

  export let filters: string[] = [];
  export let sort: SortParams | undefined = undefined;
  export let page: number | undefined = undefined;
  export let perPage: number | undefined = undefined;
  export let fields: string[] = [];
  export let total: number | undefined = undefined;
  export let selected: any[] = [];
  export let sortable: boolean = true;
  export let actions: DataTableActions<any> | undefined = undefined;

  let loading = false;
  let dataTableFilters: DataTableFilter[];

  export let service: BaseService<any>;

  export let items: any[] = [];

  export async function reload(params: IParams) {
    loading = true;
    try {
      const result = await service.query({
        filters,
        sort,
        page,
        perPage,
        fields,
      });

      if (result.data) {
        items = result.data;
        page = result.page;
        perPage = result.perPage;
        total = result.total;

        selected = [];
      }
    } catch (err) {
    } finally {
      loading = false;
    }
  }

  $: filters = (dataTableFilters ?? []).map(
    (filter) =>
      `${filter.key}:${filter.value}` +
      (filter.operator ? `:${filter.operator}` : "")
  );

  $: reload({ filters, fields, page, perPage, sort });
</script>

<Card>
  <DataTable
    {...$$restProps}
    {loading}
    {actions}
    {sortable}
    {items}
    bind:filters={dataTableFilters}
    bind:page
    bind:sort
    bind:perPage
    bind:total
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
  </DataTable>
</Card>
