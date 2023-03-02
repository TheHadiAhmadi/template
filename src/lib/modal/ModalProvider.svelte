<script lang="ts">
  import { modal } from "$lib/modal/store";
  import { Dialog, DialogContent } from "@ubeac/svelte";
</script>

{#if $modal}
  {#key $modal.open}
    <Dialog bind:open={$modal.open} size="md" {...$modal.config}>
      <DialogContent>
        <svelte:component this={$modal.component} {...$modal.props} />
      </DialogContent>
    </Dialog>
  {/key}
{/if}
