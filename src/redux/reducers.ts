import {ActionTypes, Product} from '../types/Product';

const initialState = {
  products: [] as Product[],
};

const reducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
