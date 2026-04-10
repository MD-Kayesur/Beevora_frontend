import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import { fetchProducts, fetchProductById, fetchFeaturedProducts, setFilters, clearFilters } from '@/store/slices/productSlice';
import { ProductFilter } from '@/types/product';

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const { products, featuredProducts, selectedProduct, total, page, totalPages, isLoading, isLoadingDetail, error, filters } =
    useAppSelector((state) => state.products);

  const loadProducts = useCallback(
    (params?: ProductFilter) => {
      dispatch(fetchProducts(params));
    },
    [dispatch]
  );

  const loadProductById = useCallback(
    (id: string) => {
      dispatch(fetchProductById(id));
    },
    [dispatch]
  );

  const loadFeaturedProducts = useCallback(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  const updateFilters = (newFilters: ProductFilter) => {
    dispatch(setFilters(newFilters));
  };

  const resetFilters = () => {
    dispatch(clearFilters());
  };

  return {
    products,
    featuredProducts,
    selectedProduct,
    total,
    page,
    totalPages,
    isLoading,
    isLoadingDetail,
    error,
    filters,
    loadProducts,
    loadProductById,
    loadFeaturedProducts,
    updateFilters,
    resetFilters,
  };
};
