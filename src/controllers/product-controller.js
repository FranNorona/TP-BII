import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
  purchaseProductService,
} from "../services/product-service.js";

export const createProduct = async (req, res) => {
  const newProduct = await createProductService(req.body);
  res.status(201).json(newProduct);
};

export const getAllProducts = async (req, res) => {
  const products = await getAllProductsService();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await getProductByIdService(req.params.id);
  res.json(product);
};

export const updateProduct = async (req, res) => {
  const updatedProduct = await updateProductService(req.params.id, req.body);
  res.json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  await deleteProductService(req.params.id);
  res.status(204).send();
};

export const purchaseProduct = async (req, res) => {
  const { id } = req.params;
  const product = await getProductByIdService(id);

  if (!product || product.stock <= 0) {
    return res.status(400).json({ error: "Producto agotado o no disponible." });
  }

  await purchaseProductService(id);

  res.json({ message: "Compra realizada con éxito.", product });
};

