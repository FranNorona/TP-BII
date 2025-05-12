import { cartRepository } from "../repository/cart-repository.js";

export const createCartService = async (userId) => {
  return await cartRepository.createCart(userId);
};

export const getCartByUserIdService = async (userId) => {
  return await cartRepository.getCartByUserId(userId);
};

export const addProductToCartService = async (userId, productId, quantity) => {
  return await cartRepository.addProductToCart(userId, productId, quantity);
};
