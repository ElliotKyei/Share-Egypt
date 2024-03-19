'use strict'
const db = require('../db');
const Charity = require('../models/charity');

// Adds a new charity into the database
const addCharity = async(req, res, next) => {
  try{
    const data = req.body;
    if(data == {} || !data.id){
      res.status(405).send('invalid input');
    } 
    else {
      await db.collection('charities').doc(data.id.toString()).set(data);
      res.send('Charity saved successfully');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Queries for all charities from the database
const getAllCharities = async (req, res, next) => {
  try {
    const charities = await db.collection('charities');
    const data = await charities.get();
    const charitiesArray= [];
    if(data.empty) {
      res.status(404).send('No charities records found');
    }else{
      data.forEach(rec => {
        const charity = new Charity(
          rec.id,
          rec.data().name,
          rec.data().charityId,
          rec.data().charityCenter,
          rec.data().url,
          rec.data().subscribers,
          rec.data().reviews,
          rec.data().rating,
          rec.data().coverURL,
          rec.data().category,
          rec.data().bio
        );
        charitiesArray.push(charity);
      });
      res.send(charitiesArray);
    }
  }
  catch (error) {
    res.status(400).send(error.message);
  }
};

// Get a charity by id
const getCharity = async (req, res, next) => {
  try{
    const id = req.params.id;
    const charity = await db.collection('charities').doc(id);
    const data = await charity.get();
    if(!data.exists){
      res.status(404).send(`Charity with id: ${id} not found`);
    }
    else{
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Update a charity by id
const updateCharity = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const charity = await db.collection('charities').doc(id);
    await charity.update(data);
    res.send('Charity record updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Deletes a charity by id
const deleteCharity = async (req, res, next) => {
  try {
    const id = req.params.id;
    await db.collection('charities').doc(id).delete();
    res.send('Charity record deleted successfully')
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  addCharity,
  getAllCharities,
  getCharity,
  updateCharity,
  deleteCharity
}