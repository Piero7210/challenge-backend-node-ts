import Products from "../../models/products";
import Accounts from "../../models/accounts";

export const mutations = {
  /**
   * Creates a new product with the provided input.
   * @param _ - Unused parent argument.
   * @param input - The input data for creating the product.
   * @returns The newly created product object.
   */
  createProduct: async (_: any, { input }: any) => {    
    // Validate input
    if (!input.name || !input.sku || input.stock === undefined || !input.accountId) {
      throw new Error("All fields are required");
    }

    // Destructuring input
    const { name, sku, stock, accountId } = input;

    try {
      // Create a new product instance
      const newProduct = new Products({ name, sku, stock, accountId });
      await newProduct.save();
      return newProduct;
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Failed to create product");
    }
  },
  /**
   * Purchases a product by reducing its stock.
   * @param _ - Unused parent argument.
   * @param input - The input data for purchasing the product.
   * @returns An object indicating success or failure, and remaining stock.
   */
  purchaseProduct: async (
    _: any,
    {
      input,
    }: {
      input: {
        productId: string;
        quantity: number;
        accountId: string;
      };
    }
  ) => {
    try {
      // Validate input
      if (!input || !input.productId || !input.quantity || !input.accountId) {
        throw new Error(
          "Invalid input: productId, quantity, and accountId are required"
        );
      }

      if (input.quantity <= 0) {
        throw new Error("Quantity must be greater than zero");
      }

      // Destructuring input
      const { productId, quantity, accountId } = input;
      // Validate the account exists
      const account = await Accounts.findOne({ _id: accountId });
      if (!account) throw new Error("Account not found");

      // Validate the product exists and belongs to the account
      const product = await Products.findOne({
        _id: productId,
        accountId: accountId,
      });
      if (!product)
        throw new Error("Product not found or not associated with account");

      // Validate the stock
      if (product.stock < quantity) {
        throw new Error("Insufficient stock");
      }

      // Update the stock
      product.stock -= quantity;
      await product.save();

      return {
        success: true,
        message: `Purchase successful!`,
        remainingStock: product.stock,
      };
    } catch (error: any) {
      console.error("Error during product purchase:", error);
      return {
        success: false,
        message: error.message || "Failed to complete purchase",
        remainingStock: null
      };
    }
  },
};
