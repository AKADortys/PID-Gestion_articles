const typeService = require("../services/type.service");

// fonction pour renvoyer la vue de la liste des types
exports.renderAllTypes = async (req, res) => {
  try {
    const types = await typeService.getAll();
    res.render("pages/list-type", { types: types });
  } catch (error) {
    res.render("error", { error });
  }
};

// fonction pour renvoyer la vue d'un type par ID
exports.renderTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const type = await typeService.getById(id);
    if (!type) {
      return res.render("error", { error: "Type non trouvé." });
    }
    res.status(200).json(type);
  } catch (error) {
    res.render("error", { error });
  }
};

// actions de creation ou modification d'un type
exports.createOrUpdateType = async (req, res) => {
  const { id, nom } = req.body;
  try {
    if (!nom || nom.length < 3 || nom.length > 255)
      return res.render("error", { error: "nom invalide." });
    if (id) {
      const existing = typeService.getById(id);
      if (!existing)
        return res.render("error", { error: "Catégorie non trouvée." });
      await typeService.update(id, { nom });
      res.redirect("/types");
    } else {
      await typeService.create({ nom });
      res.redirect("/types");
    }
  } catch (error) {
    res.render("error", { error });
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
    res.render("error", { error });
  }
};

// fonction pour renvoyer la vue du formulaire mode création
exports.renderFormCreate = async (req, res) => {
  try {
    res.render("pages/form-type", { type: null });
  } catch (error) {
    res.render("error", { error });
  }
};

// fonction pour renvoyer la vue du formulaire mode modif
exports.renderFormUpdt = async (req, res) => {
  const { id } = req.params;
  try {
    const type = await typeService.getById(id);
    if (!type) {
      return res.render("error", { error: "Type non trouvé." });
    }
    res.render("pages/form-type", { type });
  } catch (error) {
    res.render("error", { error });
  }
};
