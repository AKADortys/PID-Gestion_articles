const articleService = require("../services/article.service");
const typeService = require("../services/type.service");
const path = require("path");
const fs = require("fs");

exports.renderAllArticles = async (req, res) => {
  try {
    const articles = await articleService.getAll();
    const types = await typeService.getAll();
    res.render("pages/list-article", { articles: articles, types: types });
  } catch (error) {
    res.render("error", { error });
  }
};

exports.renderArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await articleService.getById(id);
    if (!article) {
      return res.render("error", { error: { message: "Article non trouvé." } });
    }
    res.render("article/article-details", { article });
  } catch (error) {
    res.render("error", { error });
  }
};

exports.deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await articleService.getById(id);
    if (!article) {
      return res.render("error", { error: { message: "Article non trouvé." } });
    }

    // Supprimer l'image liée
    if (article.image) {
      const imagePath = path.join(__dirname, "..", article.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Erreur suppression image :", err);
      });
    }

    await articleService.delete(id);

    res.redirect("/articles");
  } catch (error) {
    res.render("error", { error });
  }
};

exports.createOrUpdateArticle = async (req, res) => {
  const { id, titre, description, prix, type_id } = req.body;
  const imageUrl = req.file ? `/images/${req.file.filename}` : null;

  try {
    const articleData = {
      titre,
      description,
      prix: parseFloat(prix),
      type_id: parseInt(type_id),
    };

    // MODIFICATION
    if (id) {
      const existing = await articleService.getById(id);
      if (!existing)
        return res.render("error", {
          error: { message: "Article non trouvé." },
        });

      if (imageUrl) {
        // Supprime ancienne image si elle existe
        if (existing.image) {
          const oldPath = path.join(__dirname, "..", existing.image);
          fs.unlink(oldPath, (err) => {
            if (err) console.error("Erreur suppression ancienne image :", err);
          });
        }
        articleData.image = imageUrl;
      }

      await articleService.update(id, articleData);
    }
    // CREATION
    else {
      if (imageUrl) articleData.image = imageUrl;
      await articleService.create(articleData);
    }

    res.redirect("/articles");
  } catch (error) {
    res.render("error", { error });
  }
};

exports.renderFormCreate = async (req, res) => {
  try {
    const types = await typeService.getAll();
    res.render("pages/form-article", { article: null, types: types });
  } catch (error) {
    res.render("error", { error });
  }
};

exports.renderFormUpdt = async (req, res) => {
  try {
    const article = await articleService.getById(req.params.id);
    const types = await typeService.getAll();
    if (!article)
      return res.render("error", { error: { message: "Article non trouvé." } });
    res.render("pages/form-article", { article: article, types: types });
  } catch (error) {
    res.render("error", { error });
  }
};
