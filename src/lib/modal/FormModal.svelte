<script lang="ts">
  import { DialogBody, DialogFooter, El } from "@ubeac/svelte";
  import Modal from "./Modal.svelte";
  import { modal } from "$lib/modal/store";

  import Form from "../form/Form.svelte";

  export let title: string | undefined = undefined;
  export let values: any = {};

  function onSubmit(event: CustomEvent<any>) {
    $modal.resolve(event.detail);
  }

  function onReset() {
    $modal.resolve(undefined);
  }
</script>

<Modal {title}>
  <Form bind:values on:submit={onSubmit} on:reset={onReset}>
    <DialogBody>
      <slot />
    </DialogBody>

    <DialogFooter>
      <El class="btn-list">
        <slot name="actions" />
      </El>
    </DialogFooter>
  </Form>
</Modal>
