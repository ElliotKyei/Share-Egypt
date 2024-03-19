'use strict'
const db = require('../db');
const User = require('../models/user');
const bcrypt = require("bcrypt");

// Adds a new user to the database
const addUser = async(req, res, next) => {
  try{
    const data = req.body;
    if(!data.email && !data.password){
      res.status(400).send('Invalid input');
    }
    else{
      const userRes = await db.collection('users').where('email', '==', `${data.email}`).get();
      if(!userRes.empty){
        res.status(400).send('Email already exists');
      }
      else{
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // set user password to hashed password
        data.password = await bcrypt.hash(data.password, salt);

        await db.collection('users').doc().set(data);
        res.send('User created successfully');
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Query all users in the database
const getAllUsers = async (req, res, next) => {
  try {
    const users = await db.collection('users');
    const data = await users.get();
    const usersArray= [];
    if(data.empty) {
      res.status(404).send('No user records found');
    }else{
      data.forEach(rec => {
        const user = new User(
          rec.id,
          rec.data().name,
          rec.data().username,
          rec.data().password,
          rec.data().email,
          rec.data().phoneNumber,
          rec.data().subscriptions,
          rec.data().bookmarks,
          rec.data().avatarURL
        );
        usersArray.push(user);
      });
      res.send(usersArray);
    }
  }
  catch (error) {
    res.status(400).send(error.message);
  }
};

// Get a user by id
const getUser = async (req, res, next) => {
  try{
    const id = req.params.id;
    const user = await db.collection('users').doc(id);
    const data = await user.get();
    if(!data.exists){
      res.status(404).send(`User with id: ${id} not found`);
    }
    else{
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Update a user by id
const updateUser= async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const user = await db.collection('users').doc(id);
    await user.update(data);
    res.send('User record updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Delete user by id
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await db.collection('users').doc(id).delete();
    res.send('User record deleted successfully')
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
}