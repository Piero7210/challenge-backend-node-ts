/**
 * Interface representing a product entity in the system.
 * 
 * @interface IProduct
 * @property {string} [_id] - The unique identifier for the product, optional when creating a new product
 * @property {string} name - The name of the product
 * @property {string} sku - The stock keeping unit, a unique identifier for the product
 * @property {number} stock - The current stock quantity of the product
 * @property {string} [createdAt] - The timestamp when the product was created, optional
 * @property {string} [updatedAt] - The timestamp when the product was last updated, optional
 * @property {string} accountId - The identifier of the account that owns this product
 */
export interface IProduct {
  _id?: string;
  name: string;
  sku: string;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
  accountId: string;
}
