<script lang="ts">
  import "virtual:windi.css";
  import "@ubeac/svelte/styles/tabler.css";
  import ModalProvider from "$lib/modal/ModalProvider.svelte";
  import { Button, El, Icon, Offcanvas, OffcanvasHeader } from "@ubeac/svelte";
  import SidebarContent from "../lib/layout/SidebarContent.svelte";
  import AppPage from "$lib/layout/AppPage.svelte";
  import Logo from "../lib/layout/Logo.svelte";
  import Header from "../lib/layout/Header.svelte";

  let compactMode = false;
  let offcanvasOpen = false;
</script>

<El d="flex" class="h-full">
  <El class="h-full flex-1" d="none" dMd="flex">
    <El
      class="{compactMode
        ? 'w-56px'
        : 'w-240px'} transition-width duration-200 flex flex-col bg-white"
    >
      <Logo borderBottom {compactMode} />
      <SidebarContent {compactMode} class="flex-1" />
    </El>
    <El d="flex" class="flex-col flex-1">
      <Header bind:offcanvasOpen bind:compactMode />
      <AppPage>
        <slot />
      </AppPage>
    </El>
  </El>
  <El d="flex" dMd="none" class="flex-col flex-1">
    <Header bind:offcanvasOpen bind:compactMode />
    <AppPage>
      <slot />
    </AppPage>
  </El>
</El>

<Offcanvas
  class="!w-240px"
  autoClose
  backdrop
  placement="start"
  bind:show={offcanvasOpen}
>
  <El d="flex" borderBottom pe="3" alignItems="center" justifyContent="between">
    <Logo />

    <Button
      cssPrefix="offcanvas-header-btn"
      aria-label="Close"
      on:click={() => (offcanvasOpen = false)}
    />
  </El>

  <SidebarContent />
</Offcanvas>

<ModalProvider />

<style>
  :global(.u-body-dialog-open) {
    padding-right: 16px;
  }
</style>
