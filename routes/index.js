const router = require("express").Router();
const apiRoutes = require("./routes");
router.use ("/api", apiRoutes);
router.use(express.static("../public"));