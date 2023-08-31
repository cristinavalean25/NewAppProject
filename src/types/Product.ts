export interface Product {
  description: string;
  id: number;
  name: string;
  title: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  uri: string[];
}

export interface AddProductAction {
  type: 'ADD_PRODUCT';
  payload: Product;
}

export type ActionTypes = AddProductAction;
