const express = require("express");
const router = express.Router();
const articleController = require("../controllers/article.controller");
const upload = require("../middlewares/multer.middleware");

// Formulaire pour création
router.get("/new", articleController.renderFormCreate);

// Formulaire pour modification
router.get("/:id/edit", articleController.renderFormUpdt);

// Action création ou mise à jour
router.post(
  "/action",
  upload.single("image"),
  articleController.createOrUpdateArticle
);

router.get("/", articleController.renderAllArticles);
router.get("/:id", articleController.renderArticleById);
router.delete("/:id", articleController.deleteArticle);

module.exports = router;
