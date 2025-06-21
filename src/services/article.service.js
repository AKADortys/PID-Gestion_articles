const { Article, Type } = require("../configs/db");
const { handdleError } = require("../utils/service.util");

module.exports = {
  serviceName: "Article",
  getAll: async () => {
    try {
      return await Article.findAll({
        include: {
          model: Type,
          attributes: ["nom"], //récupérer que certaines colonnes
        },
      });
    } catch (error) {
      handdleError(error, this.serviceName);
    }
  },
  getById: async (id) => {
    try {
      return await Article.findByPk(id, {
        include: { model: Type, attributes: ["nom"] },
      });
    } catch (error) {
      handdleError(error, this.serviceName);
    }
  },
  create: async (data) => {
    try {
      return await Article.create(data);
    } catch (error) {
      handdleError(error, this.serviceName);
    }
  },
  update: async (id, data) => {
    try {
      const article = await Article.findByPk(id);
      if (!article) return null;
      await article.update(data);
      return article;
    } catch (error) {
      handdleError(error, this.serviceName);
    }
  },
  delete: async (id) => {
    try {
      const article = await Article.findByPk(id);
      if (!article) return null;
      await article.destroy();
      return true;
    } catch (error) {
      handdleError(error, this.serviceName);
    }
  },
};
