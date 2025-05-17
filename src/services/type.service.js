const { Type } = require("../configs/db");
const { handdleError } = require("../utils/service.util");

module.exports = {
  serviceName: "Types",

  // Obtenir tous les types
  getAll: async () => {
    try {
      return await Type.findAll();
    } catch (error) {
      handdleError(error, this.serviceName);
    }
  },

  // Obtenir un type par son ID
  getById: async (id) => {
    try {
      return await Type.findByPk(id);
    } catch (error) {
      handdleError(error, this.serviceName);
    }
  },

  // Créer un type
  create: async (data) => {
    try {
      return await Type.create(data);
    } catch (error) {
      handdleError(error, this.serviceName);
    }
  },

  // Mettre à jour un type par ID
  update: async (id, data) => {
    try {
      const type = await Type.findByPk(id);
      if (!type) return null;
      await type.update(data);
      return type;
    } catch (error) {
      handdleError(error, this.serviceName);
    }
  },

  // Supprimer un type par ID
  delete: async (id) => {
    try {
      const type = await Type.findByPk(id);
      if (!type) return null;
      await type.destroy();
      return true;
    } catch (error) {
      console.log(error);
    }
  },
};
