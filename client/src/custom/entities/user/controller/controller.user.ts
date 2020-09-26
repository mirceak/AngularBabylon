import * as jwt from 'jsonwebtoken';
import BaseController from '@kernel/backend/controllers/base/base.controller';

import SchemaUser from '@custom/entities/user/schema/schema.user';

class ControllerUser extends BaseController {
  model = SchemaUser;  

  login = (req, res) => {    
    this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        res.status(200).json({ token });
      });
    });
  }

}

export default ControllerUser;
