const express = require("express");
const router  = express.Router();

const booksController = require("../controllers/booksController");

router.route("/books")
  .post(booksController.create)
  .get(booksController.index);

router.route("/books/:id")
  .get(booksController.show)
  .put(booksController.update)
  .patch(booksController.update)
  .delete(booksController.delete);

module.exports = router;
