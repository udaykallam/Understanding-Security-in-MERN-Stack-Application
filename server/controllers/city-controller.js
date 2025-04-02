const City = require('../models/city-model');
const { cloudinary } = require('../config/cloudinary');

const createCity = async (req, res) => {
  try {
    const { title } = req.body;
    const imageUrl = req.file.path;
    const newCity = new City({ title, imageUrl });
    await newCity.save();
    res.status(201).json({ message: 'City created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getCities = async (req, res) => {
  try {
    const cities = await City.find({});
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { createCity, getCities };
