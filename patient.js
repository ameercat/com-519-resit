const mongoose = require("mongoose");
const { Schema } = mongoose;

const patientSchema = new Schema({
    _id: { type: mongoose.Types.ObjectId, required: true },
    age: { type: Number, required: true },
    gender: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    cholesterol: { type: Number, required: true }
}, { timestamps: true });


module.exports = mongoose.model("Patient" , patientSchema);
