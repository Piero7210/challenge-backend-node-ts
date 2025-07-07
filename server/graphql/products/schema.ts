import { gql } from "apollo-server-express";

export const schema = gql`
  """
  Represents a product in the system
  """
  type Product {
    "Unique product identifier"
    _id: ID!
    "Product name"
    name: String!
    "Unique product SKU code"
    sku: String!
    "Available quantity in stock"
    stock: Int!
    "ID of the account that owns the product"
    accountId: String!
    "Product creation date"
    createdAt: String
    "Last update date"
    updatedAt: String
  }

  """
  Input data for creating a new product
  """
  input CreateProductInput {
    "Product name (required)"
    name: String!
    "Unique SKU code (required)"
    sku: String!
    "Initial stock quantity (required)"
    stock: Int!
    "Owner account ID (required)"
    accountId: String!
  }

  """
  Input data for making a purchase
  """
  input PurchaseProductInput {
    "ID of the product to purchase"
    productId: ID!
    "Quantity to purchase"
    quantity: Int!
    "ID of the account making the purchase"
    accountId: ID!
  }

  """
  Response from a purchase operation
  """
  type PurchaseResponse {
    "Indicates if the purchase was successful"
    success: Boolean!
    "Descriptive message of the result"
    message: String!
    "Remaining stock after the purchase"
    remainingStock: Int
  }

  """
  Paginated response for product queries
  """
  type ProductsResponse {
    "List of products found"
    products: [Product!]!
    "Total number of products matching the filter"
    total: Int!
    "Indicates if more results are available"
    hasMore: Boolean!
    "Current page number"
    currentPage: Int!
    "Total number of pages"
    totalPages: Int!
  }

  extend type Query {
    """
    Gets a specific product by its ID
    """
    getProductById("Unique ID of the product to search" id: ID!): Product

    """
    Gets all products from a specific account with pagination
    """
    getProductsByAccountId(
      "ID of the account that owns the products"
      accId: ID!
      "Maximum number of results per page (default: 10)"
      limit: Int = 10
      "Number of results to skip for pagination (default: 0)"
      offset: Int = 0
    ): ProductsResponse!
  }

  extend type Mutation {
    """
    Creates a new product in the system
    """
    createProduct("Product data to create" input: CreateProductInput!): Product!

    """
    Makes a purchase of a product, reducing its stock
    """
    purchaseProduct(
      "Purchase data to process"
      input: PurchaseProductInput!
    ): PurchaseResponse!
  }
`;
