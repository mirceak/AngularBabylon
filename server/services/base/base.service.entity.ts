import * as mongoose from "mongoose";

var getBaseServiceEntity = (Entity) => {
  var findOne = (options) => {
    return Entity.findOne(options);
  };
  var find = (options) => {
    return Entity.find(options);
  };
  var create = (options) => {
    return Entity.create(options);
  };

  return { findOne, find, create };
};

export default {
  get(Entity): any {
    return getBaseServiceEntity(Entity);
  },
};
