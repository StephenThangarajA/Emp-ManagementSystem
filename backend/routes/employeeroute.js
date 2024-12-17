const express = require('express');
const { insertemployeedetail, retrieveEmployeeDetails } = require('../controllers/employeecontroller');
const router = express.Router();

router.post('/formpost',insertemployeedetail);
router.get('/formget',retrieveEmployeeDetails);

module.exports = router;