const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userController");

const route = require("express").Router();

// GET ALL USER
route.get("/", middlewareController.verifyToken, userController.getAllUsers);

//

// DELETE USER
route.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  userController.deleteUser
);

module.exports = route;
