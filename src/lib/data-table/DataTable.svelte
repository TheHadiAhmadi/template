<script lang="ts">
  import {
    El,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    Button,
  } from "@ubeac/svelte";
  import { tick } from "svelte";
  import type { SortParams } from "../BaseService";
  import type { DataTableFilter, DataTableHeader } from "./DataTable.types";
  import DataTableFilterButton from "../DataTableFilterButton.svelte";
  import DataTablePagination from "../DataTablePagination.svelte";

  type T = $$Generic;

  export let headers: DataTableHeader[] = [];
  export let items: T[] = [];
  export let selected: T[] = [];
  export let defaultFilters: DataTableFilter[] = [];
  export let filters: DataTableFilter[] = defaultFilters;
  export let sort: SortParams | undefined = undefined;
  export let page: number | undefined = undefined;
  export let perPage: number | undefined = undefined;
  export let total: number | undefined = undefined;
  export let loading: boolean = false;
  export let sortable: boolean = false;

  export let footerMode: "slot" | "pagination" | "none" = "none";
  export let headerMode: "slot" | "filters" | "none" = "none";

  let checked: any = {};
  let selectAll: boolean | undefined = undefined;
  let selectAllIndeterminate: boolean | undefined = undefined;

  async function initChecked(items: any[], selected: any[]) {
    console.log("initChecked", items.length, selected.length);
    await tick();
    for (let i = 0; i < items.length; i++) {
      if (selected.find((selectedItem) => selectedItem == items[i])) {
        console.log(i, "is selected");
        checked[i] = true;
      } else {
        console.log(i, "is not selected");
        checked[i] = false;
      }
    }
  }

  function selectItem(index: number) {
    if (!checked[index]) {
      checked[index] = true;

      if (!selected.find((item) => item == items[index])) {
        selected = [...selected, items[index]];
      }
    }
  }

  function removeFromSelection(index: number) {
    if (checked[index] !== false) {
      checked[index] = false;
      selected = selected.filter((item) => item != items[index]);
    }
  }

  async function updateSelectAll(items: any[], selected: any[]) {
    console.log("updateSelectAll", items.length, selected.length);
    await tick();
    if (selected.length === items.length) {
      selectAll = true;
      selectAllIndeterminate = false;
    } else if (selected.length > 0) {
      selectAll = false;
      selectAllIndeterminate = true;
    } else {
      selectAll = false;
      selectAllIndeterminate = false;
    }
  }

  function changeSort(name: string) {
    console.log("changeSort", name);
    if (!sort || sort.field !== name) {
      sort = {
        field: name,
        order: "ASC",
      };
    } else {
      sort.order = sort.order === "ASC" ? "DESC" : "ASC";
    }
  }

  function changeSelection(event: any, index: number) {
    const value = event.target.checked;

    if (value) selectItem(index);
    else removeFromSelection(index);
  }

  function changeSelectAll(event: any) {
    selectAll = event.target.checked;

    for (let i = 0; i < items.length; i++) {
      if (selectAll) {
        selectItem(i);
      } else {
        removeFromSelection(i);
      }
    }
  }

  let appliedFilters: Record<string, DataTableFilter> = {};
  function updateFilters(event: CustomEvent<DataTableFilter>, key: string) {
    appliedFilters[key] = event.detail;
  }

  $: filters = [
    ...defaultFilters,
    ...Object.values(appliedFilters).filter(Boolean),
  ];

  $: updateSelectAll(items, selected);
  $: initChecked(items, selected);
</script>

<El {...$$restProps} class="dark">
  <El border>
    <El if={headerMode !== "none"} borderBottom p="2">
      {#if headerMode === "slot"}
        <slot name="header" />
      {:else}
        <El d="flex" justifyContent="between">
          <El d="flex" gap="2">
            {#each headers as header}
              {#if header.type}
                {@const items =
                  header.type === "select" ? header.items : undefined}
                <DataTableFilterButton
                  key={header.key}
                  label={header.text}
                  type={header.type}
                  {items}
                  on:change={(e) => updateFilters(e, header.key)}
                />
              {/if}
            {/each}
          </El>
          <El>
            <slot name="header-actions" />
          </El>
        </El>
      {/if}
    </El>
    <El position="relative">
      <slot if={loading} name="loading" />
      <slot name="table">
        <Table striped hover border={false} mb="0">
          <TableHead>
            <TableCell class="w-0">
              <El class="py-0">
                {#key [selectAll, selectAllIndeterminate]}
                  <El
                    class="u-checkbox"
                    tag="input"
                    type="checkbox"
                    indeterminate={selectAllIndeterminate}
                    checked={selectAll}
                    on:change={changeSelectAll}
                  />
                {/key}
              </El>
            </TableCell>
            {#each headers as header}
              {#if sortable && header.sortable !== false && !!header.key}
                <TableCell px="3" on:click={() => changeSort(header.key)}>
                  <span
                    class="table-sort"
                    class:asc={sort?.field === header.key &&
                      sort?.order === "ASC"}
                    class:desc={sort?.field === header.key &&
                      sort?.order === "DESC"}
                    on:click={() => changeSort(header.key)}
                  >
                    {header.text}
                  </span>
                </TableCell>
              {:else}
                <TableCell class="px-3">
                  {header.text}
                </TableCell>
              {/if}
            {/each}
          </TableHead>
          <TableBody>
            {#each items as item, index}
              <TableRow>
                <TableCell class="w-0">
                  <El>
                    <input
                      class="u-checkbox"
                      type="checkbox"
                      checked={checked[index]}
                      on:change={(e) => changeSelection(e, index)}
                    />
                  </El>
                </TableCell>
                {#each headers as header}
                  {#if header.component}
                    {@const { slot = undefined, ...props } = header.props
                      ? header.props(item)
                      : { value: item[header.key] }}
                    <TableCell>
                      {#if slot}
                        <svelte:component this={header.component} {...props}>
                          {slot}
                        </svelte:component>
                      {:else}
                        <svelte:component this={header.component} {...props} />
                      {/if}
                    </TableCell>
                  {:else}
                    <TableCell>{item[header.key]}</TableCell>
                  {/if}
                {/each}
              </TableRow>
            {/each}
          </TableBody>
        </Table>
      </slot>
    </El>

    {#if footerMode !== "none"}
      <El p="2" borderTop>
        {#if footerMode === "slot"}
          <slot name="footer" />
        {:else if footerMode === "pagination"}
          <DataTablePagination bind:page bind:perPage bind:total />
        {/if}
      </El>
    {/if}
  </El>
</El>

<style>
  .table-sort {
    cursor: pointer;
  }
</style>
