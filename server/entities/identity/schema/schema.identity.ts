import * as mongoose from 'mongoose';

const EntityName = 'Identity';
const identitySchema = new mongoose.Schema({
  secret: String,
  mailBox: {
    type: Map, 
    of: [String]
  },
  watching: {
    type: Map,
    of: [String]
  }
});

const SchemaIdentity = mongoose.model(EntityName, identitySchema);

export default {
  SchemaIdentity,
  apiPaths: {
    pathNamePlural: mongoose.pluralize()(EntityName),
    pathName: EntityName.toLowerCase(),
  },
};
