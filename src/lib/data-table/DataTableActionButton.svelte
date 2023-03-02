<script lang="ts">
  import { Button, Icon } from "@ubeac/svelte";
  import type { DataTableActionButton } from "./DataTable.types";

  export let button: DataTableActionButton<any> | undefined = undefined;
</script>

{#if button}
  <Button size="sm" {...button.props} on:click>
    {#if button.icon}
      {@const name =
        typeof button.icon === "object" ? button.icon.name : button.icon}
      {@const pack =
        typeof button.icon === "object" ? button.icon.pack : "tabler"}
      <Icon {pack} {name} />
    {/if}
    {#if button.text}
      {button.text}
    {/if}
  </Button>
{/if}
