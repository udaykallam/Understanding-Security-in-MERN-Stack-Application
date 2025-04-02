const Place = require('../models/places-model');
const cloudinary = require('../config/cloudinary');

// Adjust the path as needed
const createPlaceController = async (req, res) => {
  try {
    const placeData = req.body;
    const images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.tempFilePath);
        images.push(result.secure_url);
      }
    }

    placeData.images = images;
    const newPlace = await Place.create(placeData);
    return res.status(200).json({ message: "Tourist place created successfully", place: newPlace });
  } catch (error) {
    console.error('Error details:', error); // Log error details
    return res.status(500).json({ message: "Failed to create tourist place", error: error.message });
  }
};


const getPlacesController = async (req, res) => {
  try {
    const places = await Place.find();
    if (!places || places.length === 0) {
      return res.status(404).json({ message: "No tourist places found" });
    }
    return res.status(200).json(places);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch tourist places" });
  }
};

module.exports = { createPlaceController, getPlacesController };
