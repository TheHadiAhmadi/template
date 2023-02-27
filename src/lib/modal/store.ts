import { writable } from "svelte/store";

export type ModalParams = {
  open: boolean;
  component?: ConstructorOfATypedSvelteComponent;
  props?: any;
};

function createModalStore() {
  let { subscribe, set, update } = writable<ModalParams>({ open: false });

  function open(component: ConstructorOfATypedSvelteComponent, props: any) {
    const result = {
      show: () => {
        set({ open: true, component, props });
      },
    };

    return result;
  }

  function close() {
    update((modal) => ({
      ...modal,
      open: false,
    }));
  }

  return {
    subscribe,
    set,
    open,
    close,
  };
}
export const modal = createModalStore();
