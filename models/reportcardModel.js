const mongoose = require("mongoose");

const validator = require("validator");
const reportcardSchema = new mongoose.Schema({});

const ReportCard = mongoose.model("ReportCard", reportcardSchema);

module.exports = ReportCard;
