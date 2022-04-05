const { renderSync } = require('node-sass');
const Product = require('../models/Product');
const User = require('../models/User');

class AdminController {

    //[GET] /admin
    index(req, res, next) {
        res.render('admin/admin',{
            layout:'adminMain',
            
        })
    };
    products(req, res, next) {
        Product.find({})
            .then(products => {
                products = products.map(product => product.toObject())
                res.render('admin/products',{
                    products,
                    layout:'adminMain',
                });
            })
            .catch(error =>{
                res.status(400).send({message: error.message});
            })
    };

    storeProducts(req, res, next){
        const formData = req.body;
        const product = new Product(formData);
        product.save()
            .then(() => res.redirect('/admin/products'))
            .catch(error => {
                res.status(400).send({message: error.message});
            })
    }
    productsDetails(req, res, next) {
        res.render('admin/productdetails', {layout:'adminMain'});
    };
    addProducts(req, res, next) {
        res.render('admin/addProducts', {layout:'adminMain'});
    };

    manageUser(req, res, next) {
        User.find({})
            .then(users => {
                users = users.map(user => user.toObject())
                res.render('admin/users',{
                    users,
                    layout:'adminMain',
                });
            })
            .catch(error =>{
                res.status(400).send({message: error.message});
            })
    };

    manageUserBanned(req, res, next) {
        User.findDeleted({})
            .then(users => {
                users = users.map(user => user.toObject())
                res.render('admin/bannedUsers',{
                    users,
                    layout:'adminMain',
                });
            })
            .catch(error =>{
                res.status(400).send({message: error.message});
            })
    };

    userRestore(req, res, next) {
        User.restore({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }
}

module.exports = new AdminController;