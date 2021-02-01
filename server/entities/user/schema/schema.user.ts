import * as mongoose from 'mongoose';
import tunnel from '../../../../client/src/cipher';

const { subtle, getRandomValues } = require('crypto').webcrypto;
const EntityName = 'User';
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
  role: String,
});

// Before saving the user, hash the password
userSchema.pre('save', async function (next): Promise<any> {
  const user: any = this;
  console.log(user);
  if (!user.isModified('password')) {
    return next();
  }

  var hash = await tunnel.getShaHash(subtle, user.password);
  user.password = hash;
  hash = await tunnel.getShaHash(subtle, user.username);
  user.username = hash;
});

userSchema.methods.comparePassword = async function (candidatePassword, candidateUsername, callback): Promise<any> {
  var ph2: any = await tunnel.getShaHash(subtle, candidateUsername);
  var ph3: any = await tunnel.getShaHash(subtle, candidatePassword);
  if (ph3 === (this as any).password && ph2 === (this as any).username) {
    callback(null, true);
    return;
  }
  callback({
    error: 'bad password',
  });
};

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
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
