const articleService = require("../services/article.service");
const typeService = require("../services/type.service");

exports.renderMain = async (req, res) => {
  try {
    const articles = await articleService.getAll();
    const types = await typeService.getAll();
    res.render("pages/main", { articles, types });
  } catch (error) {
    res.render("error", { error: error });
  }
};
