import Products from "../../models/products";

export const queries = {
  /**
   * Fetches a product by its ID.
   * @param _ - Unused parent argument.
   * @param id - The unique identifier of the product to fetch.
   * @returns The product object if found, otherwise throws an error.
   */
  getProductById: async (_: any, { id }: { id: string }) => {
    try {
      // Get product by ID
      const product = await Products.findOne({ _id: id });
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error: any) {
      throw new Error(`Error fetching product by ID: ${error.message}`);
    }
  },
  /**
   * Fetches products by account ID with pagination.
   * @param _ - Unused parent argument.
   * @param accId - The account ID to filter products by.
   * @param limit - The maximum number of products to return (default is 10).
   * @param offset - The number of products to skip (default is 0).
   * @returns An object containing the products, total count, pagination info.
   */
  getProductsByAccountId: async (
    _: any,
    {
      accId,
      limit = 10,
      offset = 0,
    }: { accId: string; limit?: number; offset?: number }
  ) => {
    try {
      // Obtain products for the given account ID
      const products = await Products.find({ accountId: accId })
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: -1 });

      // Count total products for the given account ID
      const total = await Products.countDocuments({ accountId: accId });

      // Calculate pagination details
      const currentPage = Math.floor(offset / limit) + 1;
      const totalPages = Math.ceil(total / limit);
      const hasMore = offset + limit < total;

      return {
        products,
        total,
        hasMore,
        currentPage,
        totalPages,
      };
    } catch (error: any) {
      throw new Error(
        `Error fetching products by account ID: ${error.message}`
      );
    }
  },
};
