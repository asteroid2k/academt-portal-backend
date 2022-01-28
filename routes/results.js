const { Router } = require("express");
const { getResults } = require("../controllers/resultsController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

const resultRouter = Router();
resultRouter.use(verifyToken);
resultRouter.use(verifyAdmin);

resultRouter.get("/", getResults);

module.exports = resultRouter;
