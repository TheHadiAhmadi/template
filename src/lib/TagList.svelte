<script lang="ts">
  import { Badge } from "@ubeac/svelte";

  export let items: any[];
  export let color: any | undefined = undefined;
</script>

<div class="flex items-center gap-2">
  {#each items as item}
    <Badge ghost {color}>{item}</Badge>
  {/each}
</div>
