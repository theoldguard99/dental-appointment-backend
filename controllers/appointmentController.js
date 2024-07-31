const Appointment = require('../models/Appointment');

const isTimeAllowed = (time) => {
  const hours = time.getHours();
  return hours >= 8 && hours < 18;
};

const isNotSameDay = (date) => {
  const today = new Date();
  return date.toDateString() !== today.toDateString();
};

const createAppointment = async (req, res) => {
  const { service, dentist, date, time, childName } = req.body;

  const appointmentDate = new Date(date);
  const appointmentTime = new Date(time);

  if (!isTimeAllowed(appointmentTime)) {
    return res.status(400).json({ message: 'Appointments can only be scheduled between 8:00 AM and 6:00 PM.' });
  }

  if (!isNotSameDay(appointmentDate)) {
    return res.status(400).json({ message: 'Appointments cannot be scheduled for the same day.' });
  }

  try {
    const appointment = new Appointment({
      user: req.user._id,
      service,
      dentist,
      date: appointmentDate,
      time: appointmentTime,
      childName: service === 'Pediatric Dentistry' ? childName : undefined,
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating appointment', error: error.message });
  }
};

const updateAppointment = async (req, res) => {
  const { service, dentist, date, time, childName } = req.body;

  const appointmentDate = new Date(date);
  const appointmentTime = new Date(time);

  if (!isTimeAllowed(appointmentTime)) {
    return res.status(400).json({ message: 'Appointments can only be scheduled between 8:00 AM and 6:00 PM.' });
  }

  if (!isNotSameDay(appointmentDate)) {
    return res.status(400).json({ message: 'Appointments cannot be scheduled for the same day.' });
  }

  try {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      appointment.service = service || appointment.service;
      appointment.dentist = dentist || appointment.dentist;
      appointment.date = appointmentDate || appointment.date;
      appointment.time = appointmentTime || appointment.time;
      appointment.childName = service === 'Pediatric Dentistry' ? childName : undefined;

      const updatedAppointment = await appointment.save();
      res.json(updatedAppointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating appointment', error: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id });
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching appointments', error: error.message });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (appointment) {
      res.json(appointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error fetching appointment', error: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      await appointment.deleteOne();
      res.json({ message: 'Appointment removed' });
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error deleting appointment', error: error.message });
  }
};

module.exports = {
  createAppointment,
  updateAppointment,
  getAppointments,
  getAppointmentById,
  deleteAppointment
};
