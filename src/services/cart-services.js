import { cartRepository } from "../repository/cart-repository.js";
import { productRepository } from "../repository/product-repository.js";

export const createCartService = async (userId) => {
  return await cartRepository.createCart(userId);
};

export const getCartByUserIdService = async (userId) => {
  return await cartRepository.getCartByUserId(userId);
};

export const addProductToCartService = async (userId, productId, quantity) => {
  const product = await productRepository.getProductById(productId);

  if (!product || product.stock < quantity) {
    throw new Error("Stock insuficiente o producto no encontrado.");
  }

  let cart = await cartRepository.getCartByUserId(userId);

  if (!cart) {
    cart = await cartRepository.createCart(userId);
  }

  return await cartRepository.addProductToCart(userId, productId, quantity);
};
