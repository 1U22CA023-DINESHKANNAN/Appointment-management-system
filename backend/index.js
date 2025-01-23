const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const db = mysql.createConnection({
  database: 'hospital',
  host: 'localhost',
  user: 'root',
  password: ''
});

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// Get doctor name by category
app.get("/getDoctorName", (req, res) => {
  const category = req.query.category;
  const sql = `SELECT name FROM doctor_details WHERE department = ?`;
  db.query(sql, [category], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error retrieving doctor names");
    } else {
      res.send(result);
    }
  });
});

// Get doctor ID by category and name
app.get("/getDoctorId", (req, res) => {
  const category = req.query.category;
  const name = req.query.name;
  const sql = `SELECT doctor_id FROM doctor_details WHERE department = ? AND name = ?`;
  db.query(sql, [category, name], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error retrieving doctor ID");
    } else {
      res.send(result);
    }
  });
});

// Insert new appointment data
app.post("/setAppointmentData", (req, res) => {
  const doctor_id = req.query.doctorId;
  const { name, phone, doctor, category, area, city, state, post_code } = req.body;

  const currentDate = new Date();
  const nextDay = new Date(currentDate);
  nextDay.setDate(currentDate.getDate() + 1);
  const app_date = nextDay.toISOString().split('T')[0];

  const sql = `INSERT INTO appointments(name, phone, doctor, category, area, city, state, pin_code, doctor_id, appointment_date) VALUES(?,?,?,?,?,?,?,?,?,?)`;
  db.query(sql, [name, phone, doctor, category, area, city, state, post_code, doctor_id, app_date], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error inserting appointment data");
    } else {
      res.send(app_date);
    }
  });
});

// Login route for doctor
app.post('/loginDoctor', (req, res) => {
  const sql = `SELECT email, password, doctor_id, name FROM doctor_details WHERE email = ? AND password = ?`;
  const { email, password } = req.body;

  db.query(sql, [email, password], (error, result) => {
    if (error) {
      res.status(500).send("Error logging in doctor");
    } else if (result.length >= 1) {
      res.send(["success", result]);
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
});

// Get all appointments for a doctor
app.get('/getAllData', (req, res) => {
  const id = req.query.id;
  const sql = `
    SELECT name, phone, city, state, appointment_id,
           (SELECT COUNT(*) FROM appointments WHERE doctor_id = ?) AS total_records 
    FROM appointments 
    WHERE doctor_id = ?`;
  
  db.query(sql, [id, id], (error, result) => {
    if (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("An error occurred while fetching data.");
    } else {
      res.send(result);
    }
  });
});

// Delete appointment
app.delete('/deleteAppointment', (req, res) => {
  const { appointment_id } = req.body;

  if (!appointment_id) {
    return res.status(400).json({ message: 'Appointment ID is required' });
  }

  const query = 'DELETE FROM appointments WHERE appointment_id = ?';
  
  db.query(query, [appointment_id], (err, result) => {
    if (err) {
      console.error('Error deleting appointment:', err);
      return res.status(500).json({ message: 'Error deleting appointment' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  });
});

// Update appointment
app.put('/updateAppointment', (req, res) => {
  const { appointment_id, name, phone, city, state } = req.body;

  if (!appointment_id) {
    return res.status(400).json({ message: 'Appointment ID is required' });
  }

  const query = 'UPDATE appointments SET name = ?, phone = ?, city = ?, state = ? WHERE appointment_id = ?';

  db.query(query, [name, phone, city, state, appointment_id], (err, result) => {
    if (err) {
      console.error('Error updating appointment:', err);
      return res.status(500).json({ message: 'Error updating appointment' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment updated successfully' });
  });
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
