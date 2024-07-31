const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'tour name MUST be provided'],
    unique: true,
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'a tour must have a max group size']
  },
  difficulty: {
    type: String,
    required: [true, 'a tour must have a difficulty'],
    trim: true
  },
  
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default:0
  },
  price: {
    type: Number,
    required: [true, 'a tour price MUST be provided']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'a summary must be provided']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String, // just the name of the image, not the entire image
    required: [true, 'a tour must have an image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
  
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
