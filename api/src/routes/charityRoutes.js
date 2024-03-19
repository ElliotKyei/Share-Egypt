const express = require('express');
const { addCharity, 
        getAllCharities, 
        getCharity,
        updateCharity,
        deleteCharity
      } = require('../controllers/charityController');

const router = express.Router();

router.post('/charity', addCharity );
router.get('/charities', getAllCharities );
router.get('/charity/:id', getCharity );
router.put('/charity/:id', updateCharity );
router.delete('/charity/:id', deleteCharity );

module.exports = {
  routes: router
}
