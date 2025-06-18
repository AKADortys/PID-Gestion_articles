module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "articles",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      titre: {
        type: DataTypes.STRING(150),
        unique: true,
        allowNull: false,
        validate: {
          notNull: { msg: "Le titre est requis." },
          len: {
            args: [3, 150],
            msg: "Le titre doit contenir entre 3 et 150 caractères.",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "La description est requise." },
          len: {
            args: [10, 1000],
            msg: "La description doit contenir entre 10 et 1000 caractères.",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      prix: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: { msg: "Le prix est requis." },
          isFloat: { msg: "Le prix doit être un nombre décimal." },
          min: {
            args: [0],
            msg: "Le prix doit être supérieur ou égal à 0.",
          },
        },
      },
      type_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "types",
          key: "id",
        },
      },
    },
    { timestamps: true }
  );

  Article.associate = (models) => {
    Article.belongsTo(models.Type, {
      foreignKey: "type_id",
      onDelete: "SET NULL",
    });
  };

  return Article;
};
