const { Router } = require("express");
const upload = require("../../middlewares/upload.middleware.js"); // multer instance
const { uploadListingImage, deleteListingImage } = require("../../controllers/admin/listing.controller.js");

const router = Router();

// Upload image route
router.post("/upload-image", upload.single("image"), uploadListingImage);
router.delete("/delete-image/:id", deleteListingImage);

module.exports = router;    