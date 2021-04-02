import Identity from "../schema/schema.identity";
import * as mongoose from "mongoose";

var findOne = ({ _id, secret }) => {
  return Identity.SchemaIdentity.findOne({ _id, secret });
};
var find = ({ mailBox }) => {
  return Identity.SchemaIdentity.find({
    mailBox: mailBox,
  });
};

export default {
  findOne,
  find,
};
