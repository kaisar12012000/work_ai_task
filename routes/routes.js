const { Router } = require("express");
const { createUserController, getUsersController, getUserByIdController, putUpdateUserByIdController, patchUpdateUserController, softDeleteUserController } = require("../controllers/userController");
const { superLoginController } = require("../controllers/authController");
const { requireAuth } = require("../middlewares/authMiddleware");

const router = Router()

router.post("/worko/user", requireAuth, createUserController)
router.get("/worko/users", requireAuth, getUsersController)
router.get("/worko/user/:userId", requireAuth, getUserByIdController)
router.put("/worko/user/:userId", requireAuth, putUpdateUserByIdController)
router.patch("/worko/user/:userId", requireAuth, patchUpdateUserController)
router.delete("/worko/user/:userId", requireAuth, softDeleteUserController)

router.post("/worko/super-login", superLoginController)

module.exports = router