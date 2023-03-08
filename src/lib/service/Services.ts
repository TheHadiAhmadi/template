import { BaseService } from "./base/BaseService";

type User = {
  name: string;
  email: string;
  age: number;
  id: number;
};

class UserServiceClass extends BaseService<User> {
  constructor() {
    super("/users");
  }
}

export const UserService = new UserServiceClass();

export type Product = {
  name: string;
  sku: string;
  count: number;
  id: number;
};

class ProductServiceClass extends BaseService<Product> {
  constructor() {
    super("/products");
  }
}

export const ProductService = new ProductServiceClass();

export type Todo = {
  title?: string;
  description?: string;
  done?: boolean;
};
class TodoServiceClass extends BaseService<Todo> {
  constructor() {
    super("/todos");
  }

  done(id: number) {
    super.fetch("/" + id, "PUT", { done: true });
  }
}

export const TodoService = new TodoServiceClass();
