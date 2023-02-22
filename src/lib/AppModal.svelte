<script lang="ts">
  import {
    Dialog,
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@ubeac/svelte";

  export let open: boolean = false;
  export let title: string | undefined = undefined;
</script>

<Dialog placement="center" bind:open size="lg" backdrop>
  <DialogContent>
    {#if title}
      <DialogHeader>
        <DialogTitle>
          {title}
        </DialogTitle>
      </DialogHeader>
    {/if}
    <slot>
      <DialogBody>
        <slot name="body" />
      </DialogBody>
      <DialogFooter>
        <slot name="footer" />
      </DialogFooter>
    </slot>
  </DialogContent>
</Dialog>
