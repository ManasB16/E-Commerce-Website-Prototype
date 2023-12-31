const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // req.user
  //   .createProduct({
  //     //THIS WILL IMMEDIATILY SAVE OBJECT TO THE DATABASE ACCORDING TO THE MODEL
  //     title: title,
  //     price: price,
  //     imageUrl: imageUrl,
  //     description: description,
  //   })
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user, // in mongoose if we store entire User object (req.user) in userId it'll automatically pick the _id from that Object
    // title,
    // price,
    // description,
    // imageUrl,
    // null,
    // req.user._id
  });
  product
    .save()
    .then((result) => {
      // console.log(result); //created product
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    // Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        product: product,
        editing: editMode,
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedPrice = req.body.price;
  // Product.findById(prodId)
  //   .then((product) => {
  // product.title = updatedTitle;
  // product.price = updatedPrice;
  // product.imageUrl = updatedImageUrl;
  // product.description = updatedDesc;
  // const product = new Product(
  //   updatedTitle,
  //   updatedPrice,
  //   updatedDesc,
  //   updatedImageUrl,
  //   prodId
  // );
  //   return product.save();
  // })

  Product.findById(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then((result) => {
      // console.log('UPDATED PRODUCT')
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    // .select("title price -_id") // by select we can controll which fields are returned (-_id)-> excluded the id of product
    // .populate("userId", "name") // automatically populate related fields and fetch the related data
    .then((products) => {
      // console.log(products);
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.findByPk(prodId)
  //   .then((product) => {
  //     return product.destroy();
  //   })
  Product.findByIdAndRemove(prodId)
    .then((result) => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
