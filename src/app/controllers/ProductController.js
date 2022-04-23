const Product = require('../models/Product')
const { mongooseToObject, multipleMongooseToObject } = require('../../utils/mongoose')
const {APIfeatures} = require("../../config/features");

class ProductsController {

    
    
    edit(req, res, next) {
        Product.findById(req.params.id)
            .then(product => res.render(
                'admin/editProducts',
                {
                    product: mongooseToObject(product),
                    layout: 'adminMain',
                },
                )
            )
            .catch(next);
    }

    // [PUT] /products/:id
    update(req, res, next) {
        Product.updateOne({ _id: req.params.id}, req.body)
            .then(() => res.redirect('/admin/products'))
            .catch(next);
    }

    // [DELETE] /products/:id
    delete(req, res, next) {
        Product.deleteOne({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // products(req, res, next) {
    //     Product.find({})
    //         .then(products => {
    //             products = products.map(product => product.toObject())
    //             res.render('products/products',{products,layout:'main'});
    //         })
    //         .catch(error =>{})
    // };
    
    details(req, res, next) {
        Product.findOne({ slug: req.params.slug })
            .then(product => {
                res.render('products/details', {
                    product: mongooseToObject(product)
                });
            })
            .catch(next);
    };

    async getProducts(req, res, next){
        try{
            const features = new APIfeatures(Product.find({}) , req.query)
            .paginating().sorting().searching().filtering();
            

            const result = await Promise.allSettled([
                features.query,
                Product.countDocuments()
            ]);
            //console.log(features);
            const products = result[0].status === 'fulfilled' ? result[0].value : [];
            const count = result[1].status === 'fulfilled' ? result[1].value : 0;
            console.log(products);
            //return res.status(200).json({products, count})
            return res.render('products/products',{products: multipleMongooseToObject(products),count,layout:'main' });
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = new ProductsController;