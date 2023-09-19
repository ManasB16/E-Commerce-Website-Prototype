const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

// const sequelize = require("./util/database");
// const Product = require("./models/product");

// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("65096a8a8cc8bfa36b955850")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});

// User.hasMany(Product);  // ONE TO MANY
// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

// User.hasOne(Cart); // ONE TO ONE
// Cart.belongsTo(User);

// Cart.belongsToMany(Product, {through: CartItem});  // MANY TO MANY (cart can have multiple products)
// Product.belongsToMany(Cart, { through: CartItem });   // MANY TO MANY (a product can be present in multiple cart of different users)

// sequelize
//   .sync({ force: false })
//   .then((result) => {
//     return User.findByPk(1);
//     // console.log(result);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({ name: "Max", email: "max@gmail.com" });
//     }
//     return user;
//   })
//   .then((user) => {
//     // console.log(user)
//     return user.createCart();
//   })
//   .then((cart) => {
//     app.listen(3000);
//   })
//   .catch((err) => console.log(err));
