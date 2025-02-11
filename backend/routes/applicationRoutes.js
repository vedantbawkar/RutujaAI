const express = require('express');
const Application = require('../models/Application');

const router = express.Router();

// Route to handle form submission
router.post('/apply', async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting application', error });
  }
});

module.exports = router;
