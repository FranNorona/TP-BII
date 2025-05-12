import { productRepository } from "../repository/product-repository";

export const createProductService = async (productData) => {
  return await productRepository.createProduct(productData);
};

export const getAllProductsService = async () => {
  return await productRepository.getAllProducts();
};

export const getProductByIdService = async (id) => {
  return await productRepository.getProductById(id);
};

export const updateProductService = async (id, updateData) => {
  return await productRepository.updateProduct(id, updateData);
};

export const deleteProductService = async (id) => {
  return await productRepository.deleteProduct(id);
};
