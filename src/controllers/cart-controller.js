import { addProductToCartService } from "../services/cart-service.js";

export const addProductToCart = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;
  const updatedCart = await addProductToCartService(
    userId,
    productId,
    quantity
  );
  res.json(updatedCart);
};
