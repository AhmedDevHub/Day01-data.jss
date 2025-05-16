const { cart, users, products } = require("../data");

exports.getUserCart = (req, res) => {
  const { userId } = req.params;
  const userCart = cart.find((c) => c.userId === parseInt(userId));

  if (!userCart) {
    return res.status(404).json({ message: "Cart not found for user" });
  }

  const enhancedCart = {
    userId: userCart.userId,
    items: userCart.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        ...item,
        product: product || { message: "Product not found" },
      };
    }),
  };

  res.json(enhancedCart);
};

//=======================================================================

exports.addToCart = (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity <= 0) {
    return res
      .status(400)
      .json({ message: "Valid productId and quantity are required" });
  }

  const user = users.find((u) => u.id === parseInt(userId));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const product = products.find((p) => p.id === parseInt(productId));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let userCart = cart.find((c) => c.userId === parseInt(userId));

  if (!userCart) {
    userCart = {
      userId: parseInt(userId),
      items: [],
    };
    cart.push(userCart);
  }

  const existingItemIndex = userCart.items.findIndex(
    (item) => item.productId === parseInt(productId)
  );

  if (existingItemIndex !== -1) {
    userCart.items[existingItemIndex].quantity = parseInt(quantity);
  } else {
    userCart.items.push({
      productId: parseInt(productId),
      quantity: parseInt(quantity),
    });
  }

  res.status(201).json(userCart);
};

//=======================================================================

exports.updateCartItem = (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: "Valid quantity is required" });
  }

  const userCart = cart.find((c) => c.userId === parseInt(userId));

  if (!userCart) {
    return res.status(404).json({ message: "Cart not found for user" });
  }

  const itemIndex = userCart.items.findIndex(
    (item) => item.productId === parseInt(productId)
  );

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  userCart.items[itemIndex].quantity = parseInt(quantity);
  res.json(userCart);
};

//=======================================================================

exports.removeCartItem = (req, res) => {
  const { userId, productId } = req.params;

  const userCart = cart.find((c) => c.userId === parseInt(userId));

  if (!userCart) {
    return res.status(404).json({ message: "Cart not found for user" });
  }

  const itemIndex = userCart.items.findIndex(
    (item) => item.productId === parseInt(productId)
  );

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  const removedItem = userCart.items.splice(itemIndex, 1)[0];
  res.json({ message: "Item removed from cart", item: removedItem });
};

//=======================================================================

exports.clearCart = (req, res) => {
  const { userId } = req.params;

  const userCart = cart.find((c) => c.userId === parseInt(userId));

  if (!userCart) {
    return res.status(404).json({ message: "Cart not found for user" });
  }

  userCart.items = [];
  res.json({ message: "Cart cleared", cart: userCart });
};
