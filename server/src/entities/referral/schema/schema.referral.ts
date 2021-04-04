import * as mongoose from 'mongoose';

const EntityName = 'Referral';
const referralSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true, trim: true },
  code: String,
});

const SchemaReferral = mongoose.model(EntityName, referralSchema);

export default {
  SchemaReferral,
  apiPaths: {
    pathNamePlural: mongoose.pluralize()(EntityName),
    pathName: EntityName.toLowerCase(),
  },
};
