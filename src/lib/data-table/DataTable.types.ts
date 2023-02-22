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
  | {};

export type DataTableHeader<T = any> = {
  key: string;
  text: string;
  sortable?: boolean;
  component?: ConstructorOfATypedSvelteComponent;
  props?: (item: T) => Record<string, any>;
} & DataTableFilterTypes;
