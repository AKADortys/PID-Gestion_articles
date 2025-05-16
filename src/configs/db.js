const { Sequelize, DataTypes } = require("sequelize");
const typeModel = require("../models/type.model");
const articleModel = require("../models/article.model");

const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: "mysql",
  dialectOptions: {
    timezone: "Europe/Paris",
  },
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connecté à la base de données MySQL avec Sequelize");
  })
  .catch((err) => {
    console.error("Erreur de connexion à la base de données :", err);
  });

const Type = typeModel(sequelize, DataTypes);
const Article = articleModel(sequelize, DataTypes);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Modèles synchronisés avec la base de données");
  })
  .catch((err) => {
    console.error("Erreur lors de la synchronisation des modèles :", err);
  });

module.exports = { sequelize, Type, Article };
