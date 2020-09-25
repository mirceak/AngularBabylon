"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class BaseController {
    constructor() {
        // Get all
        this.getAll = async (req, res) => {
            try {
                const docs = await this.model.find({});
                res.status(200).json(docs);
            }
            catch (err) {
                return res.status(400).json({ error: err.message });
            }
        };
        // Count all
        this.count = async (req, res) => {
            try {
                const count = await this.model.count();
                res.status(200).json(count);
            }
            catch (err) {
                return res.status(400).json({ error: err.message });
            }
        };
        // Insert
        this.insert = async (req, res) => {
            try {
                const obj = await new this.model(req.body).save();
                res.status(201).json(obj);
            }
            catch (err) {
                return res.status(400).json({ error: err.message });
            }
        };
        // Get by id
        this.get = async (req, res) => {
            try {
                const obj = await this.model.findOne({ _id: req.params.id });
                res.status(200).json(obj);
            }
            catch (err) {
                return res.status(500).json({ error: err.message });
            }
        };
        // Update by id
        this.update = async (req, res) => {
            try {
                await this.model.findOneAndUpdate({ _id: req.params.id }, req.body);
                res.sendStatus(200);
            }
            catch (err) {
                return res.status(400).json({ error: err.message });
            }
        };
        // Delete by id
        this.delete = async (req, res) => {
            try {
                await this.model.findOneAndRemove({ _id: req.params.id });
                res.sendStatus(200);
            }
            catch (err) {
                return res.status(400).json({ error: err.message });
            }
        };
    }
    getRouter() {
        const router = express.Router();
        router.route('/cats').get(this.getAll);
        router.route('/cats/count').get(this.count);
        router.route('/cat').post(this.insert);
        router.route('/cat/:id').get(this.get);
        router.route('/cat/:id').put(this.update);
        router.route('/cat/:id').delete(this.delete);
        return router;
    }
}
exports.default = BaseController;
//# sourceMappingURL=base.controller.js.map