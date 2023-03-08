<script>
  import { El, Icon } from "@ubeac/svelte";
  export let compactMode = false;
</script>

<El
  px="3"
  py="2"
  gap="2"
  class="h-14 flex items-center text-xl font-bold bg-white"
  {...$$restProps}
>
  <Icon name="database" />
  <El if={!compactMode}>DataBase</El>
</El>
