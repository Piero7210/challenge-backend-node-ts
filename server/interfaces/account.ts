/**
 * Interface representing a user account.
 * 
 * @interface IAccount
 * @property {string} [_id] - Optional unique identifier for the account
 * @property {string} name - First name of the account holder
 * @property {string} [lastname] - Optional last name of the account holder
 * @property {string} email - Email address associated with the account
 * @property {string} [createdAt] - Optional timestamp when the account was created
 * @property {string} [updatedAt] - Optional timestamp when the account was last updated
 */
export interface IAccount {
  _id?: string;
  name: string;
  lastname?: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}
