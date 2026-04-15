const express = require("express")
const router = express.Router()

const reviewController = require("../../controllers/public/review.controller.js")
const { auth } = require("../../middlewares/admin/auth.middleware")

// ================= PUBLIC =================
router.post("/", reviewController.createReview)
router.get("/listing/:listingId", reviewController.getReviewsByListing)

// ================= ADMIN (PROTECTED) =================
router.get("/", auth, reviewController.getAllReviews)
router.get("/:id", auth, reviewController.getReviewById)
router.patch("/:id", auth, reviewController.updateReview)
router.delete("/:id", auth, reviewController.deleteReview)

module.exports = router