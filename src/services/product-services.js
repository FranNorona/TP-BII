import { productRepository } from "../repository/product-repository.js";

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

export const purchaseProductService = async (id) => {
  const product = await productRepository.getProductById(id);

  if (!product || product.stock <= 0) {
    throw new Error("Producto agotado o no disponible.");
  }

  return await productRepository.updateProduct(id, {
    stock: product.stock - 1,
  });
};
