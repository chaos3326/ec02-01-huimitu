const User = require('../models/User')
const { multipleMongooseToObject } = require('../../utils/mongoose');


class UserController {

    //[GET] /admin
    index(req, res, next) {
        res.render('users/user')
    };

    delete(req, res, next) {
        User.delete({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

}

module.exports = new UserController;