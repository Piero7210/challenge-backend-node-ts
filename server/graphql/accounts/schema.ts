import { gql } from "apollo-server-express";

export const schema = gql`
  """
  Represents a user account in the system
  """
  type Account {
    "Unique identifier of the account"
    _id: ID!
    "User's first name"
    name: String!
    "User's last name (optional)"
    lastname: String
    "User's unique email address"
    email: String!
    "Account creation date"
    createdAt: String
    "Last update date"
    updatedAt: String
  }

  """
  Paginated response for account queries
  """
  type AccountsResponse {
    "List of found accounts"
    accounts: [Account!]!
    "Total number of accounts matching the filter"
    total: Int!
    "Indicates if more results are available"
    hasMore: Boolean!
    "Current page number"
    currentPage: Int!
    "Total number of pages"
    totalPages: Int!
  }

  """
  Input data for creating a new account
  """
  input CreateAccountInput {
    "User's first name (required)"
    name: String!
    "User's last name (optional)"
    lastname: String
    "Unique email address (required)"
    email: String!
  }

  extend type Query {
    """
    Gets a specific account by its ID
    """
    getAccountById("Unique ID of the account to search for" id: ID!): Account

    """
    Searches accounts by name with pagination
    """
    getAccountsByName(
      "Name to search for (partial match, case-insensitive)"
      name: String
      "Maximum number of results per page (default: 10)"
      limit: Int = 10
      "Number of results to skip for pagination (default: 0)"
      offset: Int = 0
    ): AccountsResponse!
  }

  extend type Mutation {
    """
    Creates a new account in the system
    """
    createAccount(
      "Data for the account to create"
      input: CreateAccountInput!
    ): Account!
  }
`;
