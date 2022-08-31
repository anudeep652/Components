const express = require("express");
const { signIn, signUp } = require("../controllers/userController");
const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUp);

module.exports = router;
