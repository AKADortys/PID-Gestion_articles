const express = require("express");
const router = express.Router();
const typeController = require("../controllers/type.controller");

// formulaire de creation
router.get("/new", typeController.renderFormCreate);

// formulaire de modification
router.get("/:id/edit", typeController.renderFormUpdt);

// action de création ou modification
router.post("/action", typeController.createOrUpdateType);

// liste des types
router.get("/", typeController.renderAllTypes);

// détails d'un type
router.get("/:id", typeController.renderTypeById);

// suppression d'un type
router.delete("/:id", typeController.deleteType);

module.exports = router;
