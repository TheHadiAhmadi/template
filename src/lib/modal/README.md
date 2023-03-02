# Modal store

with this store, you can open and close modals easily.

to add this system in your project you should import `ModalProvider.svelte` component and use in `src/routes/+layout.svelte` file like this: (you need to edit ModalProvider component manually and use any `<Modal>` component that you like).

```svelte
<script>
    import ModalProvider from '$lib/modal/ModalProvider.svelte'
</script>

<slot>

<ModalProvider/>
```

then you can use `modal` store to manage modals.

## open Modal

you can modals using `modal.open(...)`

```svelte
<script>
    import { modal } from '$lib/modal/store'
    import DemoModal from './DemoModal.svelte'

    async function openModal() {
        const result = await modal.open(DemoModal, {name: "This is name" , email: "This is email"})

        if(result) {
            // result: 1 | 2
            console.log(result)
        } else {
            // user didn't submitted
        }
    }
</script>

<Button on:click={openModal}>Open Modal</Button>
```

and here is `DemoModal.svelte`:

```svelte
<script>
    import Modal from '$lib/modal/Modal.svelte'
</script>

<Modal title="Demo">
    this is a modal.

    <br>
    if you press this button, 1 will be logged in console.
    <Button on:click={() => $modal.resolve(1)}>
        One
    </Button>

    <br>
    if you press this button, 2 will be logged in console.
    <Button on:click={() => $modal.resolve(2)}>
        Two
    </Button>

    <br>

    modal will be closed and nothing happens.
    <Button on:click={$modal.close}>Close</Button>
</Modal>
```

## Close modal

to close modal you can use any of these methods:

- `$modal.close()` closes the modal and resolves `undefined`
- `$modal.resolve(data)` closes modal and resolves `data`
- `$modal.reject(reason)` close modal and reject with `reason` (you can use the value in catch block).

`modal.open(...)` returns a promise which will be resolved or rejected based on above 3 methods.

## With form

also there is `FormModal.svelte` component which uses `form` with Modal.
TODO
