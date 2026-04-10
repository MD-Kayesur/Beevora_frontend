import { useAppDispatch, useAppSelector } from './useRedux';
import { addItem, removeItem, updateQuantity, clearCart, toggleCart, closeCart, applyCoupon, removeCoupon } from '@/store/slices/cartSlice';
import { selectCartItems, selectCartItemCount, selectCartSubtotal, selectCartTotal, selectCartSummary } from '@/store/slices/cartSlice';
import { Product } from '@/types/product';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const itemCount = useAppSelector(selectCartItemCount);
  const subtotal = useAppSelector(selectCartSubtotal);
  const total = useAppSelector(selectCartTotal);
  const summary = useAppSelector(selectCartSummary);
  const isOpen = useAppSelector((state) => state.cart.isOpen);
  const couponCode = useAppSelector((state) => state.cart.couponCode);

  const handleAddItem = (product: Product, quantity = 1) => {
    dispatch(addItem({ product, quantity }));
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeItem(productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  const handleCloseCart = () => {
    dispatch(closeCart());
  };

  const handleApplyCoupon = (code: string) => {
    dispatch(applyCoupon(code));
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
  };

  const isInCart = (productId: string) => items.some((item) => item.product.id === productId);

  const getItemQuantity = (productId: string) => {
    const item = items.find((i) => i.product.id === productId);
    return item?.quantity || 0;
  };

  return {
    items,
    itemCount,
    subtotal,
    total,
    summary,
    isOpen,
    couponCode,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
    toggleCart: handleToggleCart,
    closeCart: handleCloseCart,
    applyCoupon: handleApplyCoupon,
    removeCoupon: handleRemoveCoupon,
    isInCart,
    getItemQuantity,
  };
};
