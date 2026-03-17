const express = require("express")
const multer = require("multer")

const {
  register,
  login,
  getProfile
} = require("../../controllers/public/business.controller.js")

const { businessAuth } = require("../../middlewares/businessAuth")

const router = express.Router()

const upload = multer({ dest: "uploads/" })

router.post("/register", upload.single("businessDocument"), register)
router.post("/login", login)
router.get("/me", businessAuth, getProfile)

module.exports = router