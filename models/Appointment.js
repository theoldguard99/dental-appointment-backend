const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  service: { type: String, required: true },
  dentist: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: Date, required: true },
  childName: { type: String },
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
