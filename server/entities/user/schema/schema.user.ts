import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
import * as crypto from 'crypto';

const EntityName = 'User';
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
  role: String,
});

// Before saving the user, hash the password
userSchema.pre('save', function (next): void {
  const user: any = this;
  console.log(user);
  if (!user.isModified('password')) {
    return next();
  }

  var hash = crypto.createHmac('sha512', user.username);
  hash.update(user.password);
  user.password = hash.digest('base64');
  hash = crypto.createHmac('sha512', user.password);
  hash.update(user.username);
  user.username = hash.digest('base64');
});

userSchema.methods.comparePassword = function (candidatePassword, candidateUsername, callback): void {
  var ph2: any = crypto.createHmac('sha512', candidatePassword);
  ph2.update(candidateUsername);
  ph2 = ph2.digest('base64');
  var ph3: any = crypto.createHmac('sha512', candidateUsername);
  ph3.update(candidatePassword);
  ph3 = ph3.digest('base64');
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
  }
};
