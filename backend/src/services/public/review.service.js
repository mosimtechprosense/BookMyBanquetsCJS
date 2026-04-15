const prisma = require("../../config/db.js")

//* Create Review
const createReview = async (data) => {

  const { listing_id, name, phone, rating, message } = data

  if (!listing_id || !name || !phone || !rating || !message) {
    throw new Error("All fields are required")
  }

  const review = await prisma.reviews.create({
    data: {
      listing_id: Number(listing_id),
      name,
      phone,
      rating: Number(rating),
      message,
      status: false // default pending
    }
  })

  return review
}


//* Get All Reviews (Admin)
const getAllReviews = async () => {
  return await prisma.reviews.findMany({
    orderBy: { created_at: "desc" },
    include: {
      listing: {
        select: {
          id: true,
          title: true
        }
      }
    }
  });
};


//* Get Reviews By Listing (Only Approved)
const getReviewsByListing = async (listingId) => {

  return await prisma.reviews.findMany({
    where: {
      listing_id: Number(listingId),
      status: true
    },
    orderBy: { created_at: "desc" }
  })
}


//* Get Single Review
const getReviewById = async (id) => {

  const review = await prisma.reviews.findUnique({
    where: { id: Number(id) }
  })

  if (!review) {
    throw new Error("Review not found")
  }

  return review
}


//* Update Review (Admin)
const updateReview = async (id, data) => {

  const review = await prisma.reviews.update({
    where: { id: Number(id) },
    data: {
      name: data.name,
      phone: data.phone,
      rating: data.rating ? Number(data.rating) : undefined,
      message: data.message,
      status: data.status
    }
  })

  return review
}


//* Delete Review
const deleteReview = async (id) => {

  const review = await prisma.reviews.delete({
    where: { id: Number(id) }
  })

  return review
}


module.exports = {
  createReview,
  getAllReviews,
  getReviewsByListing,
  getReviewById,
  updateReview,
  deleteReview
}