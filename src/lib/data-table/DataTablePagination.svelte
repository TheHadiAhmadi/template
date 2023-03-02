<script lang="ts">
  import { Button, ButtonGroup, El, Menu } from "@ubeac/svelte";

  export let page: number = 1;
  export let perPage: number = 10;
  export let total: number = 0;

  let perPageOptions = [1, 2, 5, 10, 25, 50, 100, 200, 500, 1000];
  $: perPageOptions = [
    ...perPageOptions.filter((option) => option < total),
    total,
  ];

  $: if (perPage > total) perPage = total;
</script>

<El
  d="flex"
  class="flex-wrap"
  gap="3"
  alignItems="center"
  justifyContent="between"
>
  <El d="flex" alignItems="center" gap="2">
    <Button>
      Show in Page: {perPage}
    </Button>
    <Menu placement="bottom-start">
      {#each perPageOptions as option}
        <a
          class="dropdown-item"
          href="/"
          on:click|preventDefault={() => (total = option)}>{option}</a
        >
      {/each}
    </Menu>
    <El>
      Showing {perPage * (page - 1) + 1} - {perPage * page + 1}
      from {total}
      items
    </El>
  </El>
  <El>
    <ButtonGroup>
      <Button>Prev</Button>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
      <Button>Next</Button>
    </ButtonGroup>
  </El>
</El>
