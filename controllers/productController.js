const { products } = require("../data");

exports.getAllProducts = (req, res) => {
  res.json(products);
};
//=======================================================================

exports.getProductById = (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};
//=======================================================================

exports.searchProducts = (req, res) => {
  const { keyword, minPrice, maxPrice, categoryId } = req.query;
  let filteredProducts = [...products];

  if (keyword) {
    const lowercaseKeyword = keyword.toLowerCase();
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(lowercaseKeyword)
    );
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= parseInt(minPrice)
    );
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price <= parseInt(maxPrice)
    );
  }

  if (categoryId) {
    filteredProducts = filteredProducts.filter(
      (p) => p.categoryId === parseInt(categoryId)
    );
  }

  res.json(filteredProducts);
};
//=======================================================================

exports.addProduct = (req, res) => {
  const { name, price, categoryId } = req.body;

  if (!name || !price || !categoryId) {
    return res
      .status(400)
      .json({ message: "Name, price and categoryId are required" });
  }

  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    name,
    price: parseFloat(price),
    categoryId: parseInt(categoryId),
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};
//=======================================================================

exports.replaceProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, categoryId } = req.body;

  if (!name || !price || !categoryId) {
    return res
      .status(400)
      .json({ message: "Name, price and categoryId are required" });
  }

  const index = products.findIndex((p) => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const updatedProduct = {
    id: parseInt(id),
    name,
    price: parseFloat(price),
    categoryId: parseInt(categoryId),
  };

  products[index] = updatedProduct;
  res.json(updatedProduct);
};
//=======================================================================
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const index = products.findIndex((p) => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const updatedProduct = { ...products[index] };

  if (updates.name) updatedProduct.name = updates.name;
  if (updates.price) updatedProduct.price = parseFloat(updates.price);
  if (updates.categoryId)
    updatedProduct.categoryId = parseInt(updates.categoryId);

  products[index] = updatedProduct;
  res.json(updatedProduct);
};
//=======================================================================
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const deletedProduct = products.splice(index, 1)[0];
  res.json(deletedProduct);
};

//=======================================================================
