<script lang="ts">
  import {
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@ubeac/svelte";

  export let title: string | undefined = undefined;
</script>

<DialogContent>
  <slot name="header">
    {#if title}
      <DialogHeader>
        <DialogTitle>
          {title}
        </DialogTitle>
      </DialogHeader>
    {/if}
  </slot>
  <slot>
    <DialogBody>
      <slot name="body" />
    </DialogBody>
    <DialogFooter>
      <slot name="footer" />
    </DialogFooter>
  </slot>
</DialogContent>
