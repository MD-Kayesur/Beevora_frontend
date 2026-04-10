import { useGetProductsQuery, useGetProductByIdQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } from '@/redux/features/product/productApi';
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

  return {
    products: data?.data?.products || [],
    total: data?.data?.total || 0,
    page: data?.data?.page || 1,
    totalPages: data?.data?.totalPages || 1,
    isLoading,
    isFetching,
    isCreating,
    isUpdating,
    isDeleting,
    error,
    params,
    setParams,
    refetch,
    // Operations
    createProduct: createProductMutation,
    updateProduct: updateProductMutation,
    deleteProduct: deleteProductMutation,
  };
};
