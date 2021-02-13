import * as mongoose from 'mongoose';

const EntityName = 'MailBox';
const mailBoxSchema = new mongoose.Schema({
  secret: String,
  messages: {
    type: Map,
    of: [String],
  },
});

mailBoxSchema.pre('remove', function (next) {
  this.model('Identity').find({ mailBox: this._id }, (err, identities) => {
    identities.map((identity) => {
      identity.mailBox = identity.mailBox.filter((mail) => {
        return mail.toString() != this._id;
      });
      identity.save();
    });
    next();
  });
});

const SchemaMailBox = mongoose.model(EntityName, mailBoxSchema);

export default {
  SchemaMailBox,
  apiPaths: {
    pathNamePlural: mongoose.pluralize()(EntityName),
    pathName: EntityName.toLowerCase(),
  },
};
