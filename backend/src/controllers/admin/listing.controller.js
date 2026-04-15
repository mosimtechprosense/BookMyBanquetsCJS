const prisma = require("../../config/db.js");
const { processImage } = require("../../utils/imageProcessor");

const uploadListingImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const listingId = req.body.listingId;
    if (!listingId) {
      return res.status(400).json({ message: "listingId is required" });
    }

    // process image with sharp
    const imageName = await processImage(req.file.path);

    // save to DB and connect to listing
const saved = await prisma.venue_images.create({
  data: {
    image: imageName,
    alt_text: req.body.alt_text || null,
    created_at: new Date(),     
    updated_at: new Date(),    
    listing: {
      connect: { id: Number(listingId) }
    }
  }
});
    res.json({
      message: "Image uploaded successfully",
      image: imageName,
      data: saved,
    });

  } catch (err) {
    console.error(err);
    console.error(" UPDATE ERROR:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

const deleteListingImage = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.venue_images.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = {
  uploadListingImage,
  deleteListingImage,
};