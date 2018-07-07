const router = require("express").Router();
const headlineRoute = require('./headline');
const noteRoute = require('./note');
const fetchRoute = require('./fetch');
    console.log("from api/index.js");

router.use("/headline", headlineRoute);
router.use("/note", noteRoute);
router.use("/fetch", fetchRoute);

module.exports = router;