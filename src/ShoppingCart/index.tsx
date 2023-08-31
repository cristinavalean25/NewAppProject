import {createContext, useContext, ReactNode, useState, useEffect} from 'react';
import {ProductProps} from '../types/ProductProps';

export interface ProductItemProps {
  product: ProductProps;
}

const ShoppingCartContext = createContext<{
  cart: {product: ProductProps; qty: number}[];
  total: number;
  addProduct: (product: ProductProps) => void;
  handleRemoveItem: (productId: number) => void;
  addToFavorite: (product: ProductProps) => void;
  removeFromFavorite: (productId: number) => void;
  favorite: ProductProps[];
  productId: number | null;
  setProductId: (productId: number) => void;
  updateTotal: (newTotal: number) => void;
  userCart: {product: ProductProps; qty: number}[];
}>({
  cart: [],
  total: 0,
  addProduct: () => {},
  handleRemoveItem: () => {},
  addToFavorite: () => {},
  removeFromFavorite: () => {},
  favorite: [],
  productId: null,
  setProductId: () => {},
  updateTotal: () => {},
  userCart: [],
});

const ShoppingCartProvider = ({children}: {children: ReactNode}) => {
  const [cart, setCart] = useState<{product: ProductProps; qty: number}[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [productId, setProductId] = useState<number | null>(null);
  const [favorite, setFavorite] = useState<ProductProps[]>([]);
  const [userCart, setUserCart] = useState<
    {product: ProductProps; qty: number}[]
  >([]);

  useEffect(() => {
    if (cart.length > 0) {
      let calculatedTotal = 0;
      for (let i = 0; i < cart.length; i++) {
        calculatedTotal += cart[i].product.price * cart[i].qty;
      }
      setTotal(calculatedTotal);
    } else {
      setTotal(0);
    }
  }, [cart]);

  const addProduct = (product: ProductProps) => {
    const newCart = [...cart];
    const productIndex = newCart.findIndex(
      prod => prod.product.id === product.id,
    );
    if (productIndex === -1) {
      newCart.push({
        qty: 1,
        product: {...product},
      });
    } else {
      newCart[productIndex].qty += 1;
    }
    setCart(newCart);
    setUserCart(prevUserCart => [
      ...prevUserCart,
      {product: {...product}, qty: 0},
    ]);
  };

  const handleRemoveItem = (productId: number) => {
    const newCart = cart.filter(item => item.product.id !== productId);
    setCart(newCart);
    setUserCart(newCart);
  };

  const addToFavorite = (product: ProductProps) => {
    const newFavorit = [...favorite];
    if (!newFavorit.some(favProd => favProd.id === product.id)) {
      newFavorit.push(product);
    }
    setFavorite(newFavorit);
  };

  const removeFromFavorite = (productId: number) => {
    const newFavorite = favorite.filter(favProd => favProd.id !== productId);
    setFavorite(newFavorite);
  };
  const updateTotal = (newTotal: number) => {
    setTotal(newTotal);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cart,
        total,
        addProduct,
        handleRemoveItem,
        addToFavorite,
        removeFromFavorite,
        favorite,
        productId,
        setProductId,
        updateTotal,
        userCart,
      }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;

export const useShoppingCart = () => {
  const shoppingCart = useContext(ShoppingCartContext);
  return shoppingCart;
};
