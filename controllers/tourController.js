/* eslint-disable node/no-unsupported-features/es-syntax */
const Tour = require('./../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');


exports.aliasTopTours = (req, res, next) =>{
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
}


exports.getAllTours = async(req, res) => {
  try{

    //* Execute the Query
    const features = new APIFeatures(Tour, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    if(tours.length === 0)
      throw new Error("this page does not exist")



    //* Send response
    res.status(200).json({
      status: 'successful',
      length: tours.length,
      data: {
        tours
      }
    })
  }
  catch(error){
    console.log(error)
    res.status(400).json({
      status: 'failed',
      message: 'something went wrong'
    })
  }
};

exports.createTour = async (req, res) => {
  console.log('reached create tour');
  try{
    // const newTour = new Tour(req.body);
    // newTour.save();
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'user created successfully',
      data: {
        tour: newTour
      }
    });

  }
  catch(err){
    console.log(err);
    res.status(400).json({
      status: 'failed',
      message: 'something went wrong'
    })
  }

};

exports.getOneTour = async (req, res) => {

  try{
    const tour = await Tour.findById(req.params.id);
    // const tour = await Tour.findOne({_id: req.params.id})
    res.status(200).json({
      status: 'successful',
      data: {
        tour
      }
    })
  }
  catch(error){
    res.status(400).json({
      status: 'failed',
      message: 'something went wrong'
    })
  }
  console.log('jjjjjjjjjjj')
};

exports.updateOneTour = async (req, res) => {
  console.log(req.params.id)
  console.log(req.body)
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true});
    res.status(200).json({
      status: 'successful',
      data: {
        tour
      }
    });
  } catch (error) {
    console.error(error)
    res.status(400).json({
      status: 'failed',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'successfully deleted',
      data: {}
    })
  } catch (error) {
    res.status(400).json({
      status: 'failed'
    })
  }
  console.log('ggggggggggggg');
};
