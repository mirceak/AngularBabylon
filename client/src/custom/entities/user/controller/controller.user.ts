import * as jwt from 'jsonwebtoken';
import BaseController from '@kernel/backend/controllers/base/base.controller';

import SchemaUser from '@custom/entities/user/schema/schema.user';

class ControllerUser extends BaseController {
  Entity = SchemaUser;  

  login = (req, res) => {   
    this.Entity.findOne({ email: req.body.email }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user }, "SECRET_TOKEN");
        res.status(200).json({ token });
      });
    });
  }

  getRouter(){
    let router = super.getRouter();
    router.route('/login').post(this.login);
    return router;
  }

}

export default ControllerUser;
