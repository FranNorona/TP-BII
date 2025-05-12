import { Product } from "../dao/models/product-model.js";

class ProducRepository {
  async createProduct(productData) {
    return await Product.create(productData);
  }

  async getAllProducts() {
    return await Product.find();
  }

  async getProductById(id) {
    return await Product.findById(id);
  }

  async updateProduct(id, updateData) {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export const productRepository = new productRepository();
