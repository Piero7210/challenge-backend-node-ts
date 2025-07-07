import { Schema } from "mongoose";

import { IAccount } from "../interfaces/account";

import { cnxAccounts } from "../db/mongodb";

const accountsSchema = new Schema<IAccount>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    lastname: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /.+\@.+\..+/,
    },
  },
  { timestamps: true }
);

const Accounts = cnxAccounts.model<IAccount>("Accounts", accountsSchema);

export default Accounts;
