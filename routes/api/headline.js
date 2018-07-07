const router = require("express").Router();
const headlineController = require("../../controllers/headline")

router.get("/headline", headlineController.get);
router.get("/headline/:id", headlineController.getOne);
router.post("/headline/:id", headlineController.post);

module.exports = router;