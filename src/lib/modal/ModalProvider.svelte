<script lang="ts">
  import { modal } from "$lib/modal/store";
  import { Dialog } from "@ubeac/svelte";

  $: console.log($modal);
</script>

{#if $modal.component}
  <Dialog placement="center" bind:open={$modal.open} size="lg" backdrop>
    <svelte:component
      this={$modal.component}
      {...$modal.props}
      on:submit={$modal.props.onSubmit}
      on:reset={$modal.props.onReset}
    />
  </Dialog>
{/if}
