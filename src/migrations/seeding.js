require("dotenv").config(); // Charger les variables d'environnement
const fs = require("fs");
const path = require("path");
const { sequelize, Type, Article } = require("../configs/db");

async function seedDatabase() {
  try {
    // Synchronisation sans forcer
    await sequelize.sync();

    // Création des types si non existants
    const typesData = ["Entrée", "Plat", "Dessert"];
    const rawData = fs.readFileSync(path.join(__dirname, "articles.json"));
    const articles = JSON.parse(rawData);

    const types = await Promise.all(
      typesData.map(async (nom) => {
        return await Type.findOrCreate({ where: { nom } });
      })
    );

    const typeMap = {};
    types.forEach(([type]) => {
      typeMap[type.nom] = type.id;
    });

    for (const article of articles) {
      await Article.create({
        titre: article.titre,
        description: article.description,
        prix: article.prix,
        image: article.image,
        type_id: article.type,
      });
    }

    console.log(" Données insérées avec succès !");
  } catch (err) {
    console.error(" Erreur lors de l’initialisation :", err);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();
