<script lang="ts">
  import Modal from "$lib/modal/Modal.svelte";
  import { modal } from "$lib/modal/store";
  import { Button } from "@ubeac/svelte";
  import YesNoModal from "./YesNoModal.svelte";

  async function openYesNo() {
    try {
      const yesNoModal = modal.create(YesNoModal);

      const result = await yesNoModal.open({ test: "123" });
      console.log("resolved");
      console.log(result);
    } catch (err) {
      console.log("rejected");
      console.log(err);
    }
  }
</script>

<Button on:click={openYesNo}>Open Yes/No modal</Button>
