import mongoose from "mongoose";
import {
  addProductToCartService,
  getCartByUserIdService,
} from "../services/cart-services.js";
import { generateTicketService } from "../services/ticket-service.js";
import {
  updateProductService,
  getProductByIdService,
} from "../services/product-services.js";

export const addProductToCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;
    console.log(userId, productId, quantity);
    const updatedCart = await addProductToCartService(
      new mongoose.Types.ObjectId(userId),
      new mongoose.Types.ObjectId(productId),
      quantity
    );
    console.log(updatedCart);
    res.json(updatedCart);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await getCartByUserIdService(new mongoose.Types.ObjectId(cid));

    if (!cart || cart.products.length === 0) {
      return res
        .status(400)
        .json({ error: "El carrito está vacío o no existe." });
    }

    let totalAmount = 0;
    const failedProducts = [];
    const successfulPurchase = [];

    for (const item of cart.products) {
      const product = await getProductByIdService(
        new mongoose.Types.ObjectId(item.productId)
      );

      if (!product || product.stock < item.quantity) {
        failedProducts.push(item.productId);
      } else {
        totalAmount += product.price * item.quantity;
        await updateProductService(
          new mongoose.Types.ObjectId(item.productId),
          {
            stock: product.stock - item.quantity,
          }
        );
        successfulPurchase.push(item.productId);
      }
    }

    if (totalAmount > 0) {
      await generateTicketService(req.user.email, totalAmount);
    }

    cart.products = cart.products.filter((item) =>
      failedProducts.includes(item.productId)
    );

    res.json({
      message: "Compra procesada.",
      failedProducts,
      ticketGenerated: totalAmount > 0,
    });
  } catch (error) {
    res.status(500).json({ error: "Error procesando la compra." });
  }
};
