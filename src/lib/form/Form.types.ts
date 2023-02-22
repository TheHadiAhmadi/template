import type { SvelteComponent } from "svelte";
import type { Writable } from "svelte/store";

export type FormContext = {
  register: (name: string, component: SvelteComponent) => void;
  unregister: (name: string) => void;
  errors: Record<string, (...x: any[]) => string>;
  dirty: Writable<boolean>;
};
