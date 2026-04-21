import { useGetProductsQuery, useGetProductByIdQuery, useLazyGetProductByIdQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } from '@/redux/features/product/productApi';
import { ProductFilter } from '@/types/product';
import { useState } from 'react';

export const useProducts = (initialParams: ProductFilter = {}) => {
  const [params, setParams] = useState<ProductFilter>(initialParams);
  
  const { 
    data, 
    isLoading, 
    isFetching, 
    error, 
    refetch 
  } = useGetProductsQuery(params);

  const [createProductMutation, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProductMutation, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProductMutation, { isLoading: isDeleting }] = useDeleteProductMutation();

  const [triggerGetProduct, { data: selectedProductData, isLoading: isLoadingDetail }] = useLazyGetProductByIdQuery();

  return {
    products: data?.products || [],
    total: data?.total || 0,
    page: data?.page || 1,
    totalPages: data?.totalPages || 1,
    selectedProduct: selectedProductData,
    isLoading,
    isLoadingDetail,
    isFetching,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    params,
    setParams,
    refetch,
    // Operations
    loadProductById: triggerGetProduct,
    createProduct: createProductMutation,
    updateProduct: updateProductMutation,
    deleteProduct: deleteProductMutation,
  };
};
