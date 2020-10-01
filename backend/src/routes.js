const { Router } = require("express");
const userController = require("./controllers/userController");
const sessionController = require("./controllers/sessionController");
const heroController = require("./controllers/heroController");
const authMiddleware = require("./middlewares/auth");
const routes = new Router();

routes.post("/session", sessionController.auth);
routes.post("/user/store", userController.store);
routes.use(authMiddleware);
routes.post("/hero", heroController.store);
routes.get("/", (req, res) => {
    return res.json({ ok: "ok" });
});

module.exports = routes;
