const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  businessName: { type: String },
  businessType: { type: String, required: true },
  businessStage: { type: String, required: true },
  numEmployees: { type: Number },
  monthlyIncome: { type: Number, required: true },
  fundingPurpose: { type: String, required: true },
  requiredAmount: { type: Number, required: true },
  fundingType: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
