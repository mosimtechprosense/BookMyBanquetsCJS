const reviewService = require("../../services/public/review.service.js")

//* Create Review
const createReview = async (req, res) => {
  try {
    const review = await reviewService.createReview(req.body)

    return res.status(201).json({
      success: true,
      data: review
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
}


//* Get All Reviews (Admin)
const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getAllReviews()

    return res.json({
      success: true,
      data: reviews
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews"
    })
  }
}


//* Get Reviews By Listing (Public)
const getReviewsByListing = async (req, res) => {
  try {
    const { listingId } = req.params

    const reviews = await reviewService.getReviewsByListing(listingId)

    return res.json({
      success: true,
      data: reviews
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews"
    })
  }
}


//* Get Single Review
const getReviewById = async (req, res) => {
  try {
    const review = await reviewService.getReviewById(req.params.id)

    return res.json({
      success: true,
      data: review
    })
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    })
  }
}


//* Update Review (Admin)
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await reviewService.updateReview(id, req.body);

    return res.json({
      success: true,
      data: updated
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update review"
    });
  }
};

//* Delete Review
const deleteReview = async (req, res) => {
  try {
    await reviewService.deleteReview(req.params.id)

    return res.json({
      success: true,
      message: "Review deleted successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete review"
    })
  }
}


module.exports = {
  createReview,
  getAllReviews,
  getReviewsByListing,
  getReviewById,
  updateReview,
  deleteReview
}