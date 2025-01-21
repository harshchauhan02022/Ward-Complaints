const express = require("express");
const upload = require("../middleware/upload");
const UserController = require("../controllers/UserController");

const router = express.Router();

router.get("/", UserController.getAllUsers);8
router.post("/login", UserController.loginUser);
router.post("/verify", UserController.verifyOtp);
router.post("/NewProblems", upload.single("photo"), UserController.registerProblem);

module.exports = router;
 