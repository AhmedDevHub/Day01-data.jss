const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.post("/addUser", userController.addUser);

router.put("/replaceUser/:id", userController.replaceUser);

router.delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;
