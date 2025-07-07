import Accounts from "../../models/accounts";

export const mutations = {
  /**
   * Creates a new account with the provided input.
   * @param _ - Unused parent argument.
   * @param input - The input data for creating the account.
   * @returns The newly created account object.
   */
  createAccount: async (_: any, { input }: any) => {
    // Destructuring input
    const { name, email, lastname } = input;

    // Validate input
    if (!name || !email || !lastname) {
      throw new Error("All fields are required");
    }

    // Validate if user already exists
    const userExists = await Accounts.findOne({ email: email.toLowerCase() });
    if (userExists) {
      throw new Error("User already exists with this email");
    }    

    try {
      // Create a new account instance
      const newAccount = new Accounts({ name, email, lastname });
      await newAccount.save();
      return newAccount;      
    } catch (error) {
      console.error("Error creating account:", error);
      throw new Error("Failed to create account");
    }
  },
};
