import {Product} from '../types/Product';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

export const incrementCounter = () => ({
  type: INCREMENT_COUNTER,
});

///////////////////////////////////////

export const addProduct = (product: Product) => ({
  type: 'ADD_PRODUCT',
  payload: product,
});

//////////////////////////////////////
