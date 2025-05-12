import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
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
