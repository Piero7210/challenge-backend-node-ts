import Accounts from "../../models/accounts";

export const queries = {
  /**
   * Fetches an account by its ID.
   * @param _ - Unused parent argument.
   * @param id - The unique identifier of the account to fetch.
   * @returns The account object if found, otherwise throws an error.
   */
  getAccountById: async (_: any, { id }: { id: string }) => {
    try {
      // Find account by ID
      const account = await Accounts.findOne({ _id: id });
      if (!account) {
        throw new Error("Account not found");
      }
      return account;
    } catch (error: any) {
      throw new Error(`Error fetching account by ID: ${error.message}`);
    }
  },
  /**
   * Fetches accounts by name with pagination.
   * @param _ - Unused parent argument.
   * @param name - The name to search for in accounts.
   * @param limit - The maximum number of accounts to return (default is 10).
   * @param offset - The number of accounts to skip (default is 0).
   * @returns An object containing the accounts, total count, pagination info.
   */
  getAccountsByName: async (
    _: any,
    {
      name,
      limit = 10,
      offset = 0,
    }: {
      name: string;
      limit?: number;
      offset?: number;
    }
  ) => {
    try {
      // Find accounts by name
      const query = name ? { name: new RegExp(name, "i") } : {};

      // Count total documents matching the query
      const total = await Accounts.countDocuments(query);

      // Obtain accounts with pagination
      const accounts = await Accounts.find(query)
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: 1 }); // Order by createdAt

      return {
        accounts,
        total,
        hasMore: offset + limit < total,
        currentPage: Math.floor(offset / limit) + 1,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error: any) {
      throw new Error(`Error fetching accounts: ${error.message}`);
    }
  },
};
