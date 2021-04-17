import * as express from "express";
import utils from "../utils";

abstract class BaseController {
  abstract Service: any;
  private router;

  public protectedRoutes = [];
  public routes = [];

  registerProtectedRoute(route) {
    this.protectedRoutes.push("/" + this.Service.Entity.apiPaths.pathName + route);
    return this._getRouter().route("/" + this.Service.Entity.apiPaths.pathName + route);
  }

  getSafeMethod(method) {
    return async function () {
      try {
        await method(...arguments);
      } catch (error) {
        console.log(error);
        return arguments[1].status(500).send({
          message: "services.error",
        });
      }
    };
  }

  registerRoute(route) {
    this.routes.push("/" + this.Service.Entity.apiPaths.pathName + route);
    return this._getRouter().route("/" + this.Service.Entity.apiPaths.pathName + route);
  }

  getRouter() {
    return this._getRouter();
  }

  _getRouter() {
    if (!this.router) {
      this.router = express.Router();
      this.router.use(
        ["*"],
        this.getSafeMethod(async (req, res, next) => {
          if (this.protectedRoutes.indexOf(req._parsedUrl.pathname) === -1) {
            return next();
          }
          var reqData: any = await utils.getRequestData(req.body);
          req.decryptedData = reqData.decryptedData;
          req.sessionJwt = reqData.sessionJwt;
          req.send = this.getSafeMethod(async (data, res) => {
            var encryptedResponse = await utils.encryptResponseData(
              { decryptedData: req.decryptedData, sessionJwt: req.sessionJwt },
              data
            );
            res.send({
              rsaEncryptedAes: encryptedResponse.rsaEncryptedAes,
              aesEncrypted: encryptedResponse.aesEncrypted,
            });
          });
          next();
        })
      );
      this.router
        .route("/" + this.Service.Entity.apiPaths.pathNamePlural)
        .get(this.getAll);
      this.router
        .route("/" + this.Service.Entity.apiPaths.pathNamePlural + "/count")
        .get(this.count);
      this.router.route("/" + this.Service.Entity.apiPaths.pathName).post(this.insert);
      this.router
        .route("/" + this.Service.Entity.apiPaths.pathName + "/:id")
        .get(this.get);
      this.router
        .route("/" + this.Service.Entity.apiPaths.pathName + "/:id")
        .put(this.update);
      this.router
        .route("/" + this.Service.Entity.apiPaths.pathName + "/:id")
        .delete(this.delete);
    }
    return this.router;
  }

  // Get all
  getAll = async (req, res) => {
    try {
      const docs = await this.Service.find({});
      res.status(200).json(docs);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  // Count all
  count = async (req, res) => {
    try {
      const count = await this.Service.Entity.countDocuments();
      res.status(200).json(count);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  // Insert
  insert = async (req, res) => {
    try {
      const obj = await new this.Service.Entity(req.body).save();
      res.status(201).json(obj);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  // Get by id
  get = async (req, res) => {
    try {
      const obj = await this.Service.findOne({ _id: req.params.id });
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  // Update by id
  update = async (req, res) => {
    try {
      await this.Service.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.sendStatus(200);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };

  // Delete by id
  delete = async (req, res) => {
    try {
      await this.Service.findOneAndRemove({ _id: req.params.id });
      res.sendStatus(200);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
}

export default BaseController;
