"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const base_controller_1 = require("@kernel/backend/controllers/base/base.controller");
const schema_user_1 = require("@custom/entities/user/schema/schema.user");
class ControllerUser extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.model = schema_user_1.default;
        this.login = (req, res) => {
            this.model.findOne({ email: req.body.email }, (err, user) => {
                if (!user) {
                    return res.sendStatus(403);
                }
                user.comparePassword(req.body.password, (error, isMatch) => {
                    if (!isMatch) {
                        return res.sendStatus(403);
                    }
                    const token = jwt.sign({ user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
                    res.status(200).json({ token });
                });
            });
        };
    }
}
exports.default = ControllerUser;
//# sourceMappingURL=controller.user.js.map