<script lang="ts">
  import {
    El,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
  } from "@ubeac/svelte";
  import { tick } from "svelte";
  import DataTableFilterButton from "./DataTableFilterButton.svelte";
  import DataTablePagination from "./DataTablePagination.svelte";

  export let headers: any[] = [];
  export let items: any[] = [];
  export let selected: any[] = [];
  export let defaultFilters: any[] = [];
  export let filters: any[] = defaultFilters;
  export let page: number | undefined = undefined;
  export let perPage: number | undefined = undefined;
  export let total: number | undefined = undefined;
  export let loading: boolean = false;

  export let footerMode: "slot" | "pagination" | "none" = "none";
  export let headerMode: "slot" | "filters" | "none" = "none";

  let checked: any = {};
  let selectAll: boolean | undefined = undefined;
  let selectAllIndeterminate: boolean | undefined = undefined;

  function initChecked(items: any[], selected: any[]) {
    for (let i = 0; i < items.length; i++) {
      if (selected.find((selectedItem) => selectedItem == items[i])) {
        checked[i] = true;
      } else {
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

  let appliedFilters: any = {};
  function updateFilters(event: CustomEvent<string>, key: string) {
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
                <DataTableFilterButton
                  key={header.key}
                  label={header.text}
                  type={header.type}
                  items={header.items}
                  on:change={(e) => updateFilters(e, header.key)}
                />
              {/if}
            {/each}
          </El>
          <El>
            <!-- <Button>Default</Button> -->
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
              <TableCell class="px-3">{header.text}</TableCell>
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
