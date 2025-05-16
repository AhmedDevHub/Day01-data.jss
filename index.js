const express = require("express");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
//both bodyParser and express.json are used to parse the body of the request and parse it to json

//directed to router
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "E-commerce API",
    endpoints: {
      products: "/api/products",
      categories: "/api/categories",
      users: "/api/users",
      cart: "/api/cart/:userId",
    },
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
