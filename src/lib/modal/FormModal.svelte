<script>
  import { DialogBody, DialogFooter, El } from "@ubeac/svelte";
  import Modal from "./Modal.svelte";

  import Form from "../form/Form.svelte";
</script>

<Modal>
  <Form on:submit on:reset>
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
