import { addProductToCartService, getCartByUserIdService } from "../services/cart-service.js";
import { generateTicketService } from "../services/ticket-service.js";
import { updateProductService, getProductByIdService } from "../services/product-service.js";

export const addProductToCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    const updatedCart = await addProductToCartService(userId, productId, quantity);
    res.json(updatedCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await getCartByUserIdService(cid);

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ error: "El carrito está vacío o no existe." });
    }

    let totalAmount = 0;
    const failedProducts = [];
    const successfulPurchase = [];

    for (const item of cart.products) {
      const product = await getProductByIdService(item.productId); // ✅ Obtener datos actuales del producto

      if (!product || product.stock < item.quantity) {
        failedProducts.push(item.productId); // ✅ Si no hay stock suficiente, queda en el carrito
      } else {
        totalAmount += product.price * item.quantity;
        await updateProductService(item.productId, { stock: product.stock - item.quantity });
        successfulPurchase.push(item.productId); // ✅ Guardamos los productos comprados
      }
    }

    if (totalAmount > 0) {
      await generateTicketService(req.user.email, totalAmount);
    }

    // ✅ Filtrar los productos comprados, dejando solo los que no tenían stock en el carrito
    cart.products = cart.products.filter(item => failedProducts.includes(item.productId));

    res.json({
      message: "Compra procesada.",
      failedProducts,
      ticketGenerated: totalAmount > 0,
    });
  } catch (error) {
    res.status(500).json({ error: "Error procesando la compra." });
  }
};
