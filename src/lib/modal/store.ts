import type { DialogProps } from "@ubeac/svelte";
import type { SvelteComponent, ComponentProps } from "svelte";
import { null_to_empty } from "svelte/internal";
import { writable } from "svelte/store";

const defaultModalProps: DialogProps = {
  placement: "center",
  backdrop: true,
  size: "md",
};

export type ModalParams = {
  open: boolean;
  component?: new (...args: any) => SvelteComponent;
  props?: any;
  config?: DialogProps;
  close: () => void;
  resolve: (data: any) => void;
  reject: (reason: any) => void;
};

function createModalStore() {
  let { subscribe, set, update } = writable<ModalParams>();

  function open<
    Component extends SvelteComponent,
    Props extends ComponentProps<Component> | {}
  >(
    component: new (...args: any) => Component,
    props: Props = {},
    modalProps?: DialogProps
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      function close() {
        update((modal) => ({
          ...modal!,
          open: false,
        }));
      }
      set({
        open: true,
        component,
        props,
        config: { ...defaultModalProps, ...modalProps },
        resolve: (payload: any) => {
          close();
          resolve(payload);
        },
        reject: (reason: any) => {
          close();
          reject(reason);
        },
        close() {
          close();
          resolve(false);
        },
      });
    });
  }

  function create<
    Component extends SvelteComponent,
    Props extends ComponentProps<Component>
  >(component: new (...args: any) => Component, defaultProps: Props) {
    return {
      open: (props?: Props, config?: DialogProps) =>
        open(component, { ...defaultProps, ...props }, config),
    };
  }

  return {
    subscribe,
    set,
    open,
    create,
  };
}
export const modal = createModalStore();
