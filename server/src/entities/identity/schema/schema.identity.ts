import * as mongoose from "mongoose";
import { Cryptography } from "../../../certs/jwtSessionToken/jwtSessionToken";

const EntityName = "Identity";
const identitySchema = new mongoose.Schema({
  secret: String,
  password: { type: String, required: true },
  pin: { type: String, required: true },
  mailBox: [{ type: mongoose.Schema.Types.ObjectId, ref: "MailBox" }],
});

identitySchema.pre("save", async function (next): Promise<any> {
  const identity: any = this;
  var hash;
  if (!identity.isModified("password") && !identity.isModified("pin")) {
    return next();
  }
  if (identity.isModified("password")) {
    identity.password.split("").reverse().join("");
    hash = await Cryptography.getShaHash(identity.password);
    identity.password = hash;
  }
  if (identity.isModified("pin")) {
    identity.pin.split("").reverse().join("");
    hash = await Cryptography.getShaHash(identity.pin);
    identity.pin = hash;
  }
  return next();
});

const SchemaIdentity = mongoose.model(EntityName, identitySchema);

export default {
  SchemaIdentity,
  apiPaths: {
    pathNamePlural: mongoose.pluralize()(EntityName),
    pathName: EntityName.toLowerCase(),
  },
};
