import {ProductProps} from './ProductProps';

export type RootStackParamList = {
  Home: undefined;
  Navbar: undefined;
  ImageScreen: undefined;
  Login: undefined;
  Register: undefined;
  UserProfile: any;
  Tricouri: undefined;
  CategoryPage: {category: string};
  ProductPage: {product: ProductProps};
  Cart: undefined;
};
