import { Cart } from "../models/cart-model.js";

class CartRepository {
  async createCart(userId) {
    return await Cart.create({ userId, products: [] });
  }

  async getCartByUserId(userId) {
    return await Cart.findOne({ userId }).populate("products.productId");
  }

  async addProductToCart(userId, productId, quantity) {
    return await Cart.findOneAndUpdate(
      { userId },
      { $push: { products: { productId, quantity } } },
      { new: true }
    );
  }
}

export const cartRepository = new CartRepository();
