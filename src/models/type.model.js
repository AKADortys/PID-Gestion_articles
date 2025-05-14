module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define(
    "types",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      nom: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Le nom est requis !",
          },
          len: {
            args: [3, 100],
            msg: "Le nom doit contenir entre 3 et 100 caractères.",
          },
        },
      },
    },
    { timestamps: true }
  );

  return Type;
};
