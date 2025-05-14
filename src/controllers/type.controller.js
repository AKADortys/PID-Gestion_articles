const typeService = require("../services/type.service");

// Récupérer tous les types
exports.getAllTypes = async (req, res) => {
  try {
    const types = await typeService.getAll();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Récupérer un type par ID
exports.getTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const type = await typeService.getById(id);
    if (!type) {
      return res.status(404).json({ message: "Type non trouvé." });
    }
    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Créer un nouveau type
exports.createType = async (req, res) => {
  const { nom } = req.body;

  if (!nom || nom.length < 3 || nom.length > 100) {
    return res.status(400).json({ message: "Le nom est invalide." });
  }

  try {
    const newType = await typeService.create({ nom });
    res.status(201).json(newType);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du type." });
  }
};

// Mettre à jour un type
exports.updateType = async (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;

  if (!nom || nom.length < 3 || nom.length > 100) {
    return res.status(400).json({ message: "Le nom est invalide." });
  }

  try {
    const updatedType = await typeService.update(id, { nom });
    if (!updatedType) {
      return res.status(404).json({ message: "Type non trouvé." });
    }
    res.status(200).json(updatedType);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du type." });
  }
};

// Supprimer un type
exports.deleteType = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await typeService.delete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Type non trouvé." });
    }
    res.status(204).send(); // Pas de contenu
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du type." });
  }
};
