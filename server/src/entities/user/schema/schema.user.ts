import * as mongoose from "mongoose";
import _Cryptography from "../../../cryptography";

const webcrypto = require("crypto").webcrypto;
var Cryptography = new _Cryptography(webcrypto);
const EntityName = "User";
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
});

// Before saving the user, hash the passwords
userSchema.pre("save", async function (next): Promise<any> {
  const user: any = this;
  var hash;
  if (!user.isModified("password") && !user.isModified("email")) {
    return next();
  }
  if (user.isModified("email")) {
    hash = await Cryptography.getShaHash(user.email);
    user.email = hash;
  }
  if (user.isModified("password")) {
    hash = await Cryptography.getShaHash(user.password);
    user.password = hash;
  }
  return next();
});

// Omit the password when returning a user
userSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.password;
    delete ret.email;
    return ret;
  },
});

const SchemaUser = mongoose.model(EntityName, userSchema);

export default {
  SchemaUser,
  apiPaths: {
    pathNamePlural: mongoose.pluralize()(EntityName),
    pathName: EntityName.toLowerCase(),
  },
};
