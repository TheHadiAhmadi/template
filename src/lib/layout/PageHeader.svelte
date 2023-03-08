<script lang="ts">
  import { El } from "@ubeac/svelte";
  import PageTitle from "./PageTitle.svelte";
  export let title: string | undefined = undefined;
</script>

<El pt="4" pb="3" d="flex" alignItems="center" justifyContent="between">
  {#if title}
    <PageTitle>{title}</PageTitle>
  {/if}
  <slot />
</El>
