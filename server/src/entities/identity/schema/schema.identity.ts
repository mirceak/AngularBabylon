import * as mongoose from "mongoose";

const EntityName = "Identity";
const identitySchema = new mongoose.Schema({
  secret: String,
  mailBox: [{ type: mongoose.Schema.Types.ObjectId, ref: "MailBox" }],
  lastJwtHash: String,
  lastSessionTokenHash: String,
});

const SchemaIdentity = mongoose.model(EntityName, identitySchema);

export default {
  SchemaIdentity,
  apiPaths: {
    pathNamePlural: mongoose.pluralize()(EntityName),
    pathName: EntityName.toLowerCase(),
  },
};
