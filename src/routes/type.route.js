const express = require("express");
const router = express.Router();
const typeController = require("../controllers/type.controller");

router.get("/new", typeController.renderFormCreate);
router.get("/:id/edit", typeController.renderFormUpdt);
router.post("/action", typeController.createOrUpdateType);
router.get("/", typeController.renderAllTypes);
router.get("/:id", typeController.renderTypeById);
router.delete("/:id", typeController.deleteType);

module.exports = router;
