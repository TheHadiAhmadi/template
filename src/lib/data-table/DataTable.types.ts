import type { ButtonProps } from "@ubeac/svelte/components/Button/Button.svelte";

type SelectItems =
  | {
      key: string;
      value: string;
    }
  | string;

export type DataTableFilter = {
  key: string;
  operator: string;
  value: string;
};

export type DataTableFilterTypes =
  | {
      type: "text";
    }
  | { type: "select"; items?: SelectItems[] }
  | { type: "number" };

export type DataTableHeader<T = any> = {
  key: string;
  text: string;
  sortable?: boolean;
  component?: ConstructorOfATypedSvelteComponent;
  props?: (item: T) => Record<string, any>;
} & DataTableFilterTypes;

export type DataTableActionButton<T> = {
  icon?: string | { name: string; pack: string };
  text?: string;
  props?: ButtonProps;
  onClick?: (item: T) => void;
};

export type DataTableActions<T> = {
  text?: string;
  type?: "dropdown" | "list";
  dropdownButton?: Omit<DataTableActionButton<T>, "onClick">;
  buttons: (item: T) => DataTableActionButton<T>[];
};
