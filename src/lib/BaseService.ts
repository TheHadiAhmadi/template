export type SortParams = {
  field: string;
  order: "ASC" | "DESC";
};

export type IParams = {
  filters?: string[];
  sort?: SortParams;
  page?: number;
  perPage?: number;
  fields?: string[];
};

export type IList<T> = {
  data: T[];
  total: number;
  perPage: number;
  page: number;
};

const apiURL = "https://test-db-12345.vercel.app";

export class BaseService<T> {
  path = "";
  constructor(path: string) {
    this.path = path;
  }

  async insert(body: any): Promise<T> {
    const result: T = await fetch(apiURL + this.path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());

    return result;
  }

  async remove(id: string | number) {
    const result = await fetch(apiURL + this.path + "/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
    return result;
  }

  async update(id: string | number, data: any) {
    const result = await fetch(apiURL + this.path + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    return result;
  }

  async query(params: IParams): Promise<IList<T>> {
    let query = "?";
    if (params.filters?.length) {
      query += "filters=" + JSON.stringify(params.filters) + "&";
    }
    if (params.fields?.length) {
      query += "fields=" + JSON.stringify(params.fields) + "&";
    }
    if (params.sort) {
      query +=
        "sort=" +
        (params.sort.order === "ASC" ? "" : "-") +
        params.sort.field +
        "&";
    }
    if (params.page) {
      query += "page=" + params.page + "&";
    }
    if (params.perPage) {
      query += "perPage=" + params.perPage + "&";
    }

    query = query.substring(0, query.length - 1);
    const result: IList<T> = await fetch(apiURL + this.path + query).then(
      (res) => res.json()
    );

    return result;
  }
}

type User = {
  name: string;
  email: string;
  age: number;
  id: number;
};

type Product = {
  name: string;
  sku: string;
  count: number;
  id: number;
};

export const UserService = new BaseService<User>("/users");
export const ProductService = new BaseService<Product>("/products");
