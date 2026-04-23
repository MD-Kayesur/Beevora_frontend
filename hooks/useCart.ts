import { useAppDispatch, useAppSelector } from './useRedux';
import { toggleCart, closeCart } from '@/redux/features/cart/cartSlice';
import { 
  useGetCartQuery, 
  useAddToCartMutation, 
  useRemoveFromCartMutation, 
  useUpdateCartItemMutation, 
  useClearCartMutation,
  useApplyCouponMutation 
} from '@/redux/features/cart/cartApi';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.cart.isOpen);
  
  const { data: cartData, isLoading } = useGetCartQuery();
  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [updateQuantity] = useUpdateCartItemMutation();
  const [clearCartMutation] = useClearCartMutation();
  const [applyCouponMutation] = useApplyCouponMutation();

  const items = cartData?.data?.items || [];
  const total = cartData?.data?.total || 0;
  const subtotal = cartData?.data?.subtotal || 0;
  const discount = cartData?.data?.discount || 0;
  const couponCode = cartData?.data?.coupon || '';

  return {
    items,
    total,
    subtotal,
    discount,
    couponCode,
    isOpen,
    isLoading,
    itemCount: items.reduce((acc: number, item: any) => acc + item.quantity, 0),
    summary: {
      total,
      discount,
      subtotal,
    },
    addItem: (product: any, quantity: number = 1) => {
      const productId = typeof product === 'string' ? product : product.id || product._id;
      return addToCart({ productId, quantity });
    },
    removeItem: (itemId: string) => removeFromCart(itemId),
    updateQuantity: (itemId: string, quantity: number) => updateQuantity({ itemId, quantity }),
    clearCart: () => clearCartMutation(),
    toggleCart: () => dispatch(toggleCart()),
    closeCart: () => dispatch(closeCart()),
    applyCoupon: (code: string) => applyCouponMutation(code),
    isInCart: (productId: string) => items.some((item: any) => (item?.product?.id || item?.product?._id) === productId),
    getItemQuantity: (productId: string) => items.find((item: any) => (item?.product?.id || item?.product._id) === productId)?.quantity || 0,
  };
};
