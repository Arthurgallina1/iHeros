const { Router } = require("express");
const userController = require("./controllers/userController");
const sessionController = require("./controllers/sessionController");
const heroController = require("./controllers/heroController");
const authMiddleware = require("./middlewares/auth");
const routes = new Router();

routes.post("/session", sessionController.auth);
routes.post("/user/store", userController.store);
routes.use(authMiddleware);
routes.get("/hero", heroController.index);
routes.post("/hero", heroController.store);
routes.put("/hero/:_id", heroController.update);
routes.delete("/hero/:_id", heroController.delete);
routes.get("/", (req, res) => {
    return res.json({ ok: "ok" });
});

module.exports = routes;
