import * as mongoose from 'mongoose';

const EntityName = 'Contact';
const contactSchema = new mongoose.Schema({
  secret: String,
  messages: {
    type: Map, 
    of: [String]
  },
});

const SchemaContact = mongoose.model(EntityName, contactSchema);

export default {
  SchemaContact,
  apiPaths: {
    pathNamePlural: mongoose.pluralize()(EntityName),
    pathName: EntityName.toLowerCase(),
  },
};
