require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());
app.use(morgan('dev'));

const MONGO = process.env.MONGO_URI;
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected to DB:', mongoose.connection.name);
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use((req, res, next) => {
  console.log("📩 Incoming headers:", req.headers);
  next();
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/mood', require('./routes/mood'));
app.use("/api/phq9", require("./routes/phq-9"));
app.use("/api/journal", require("./routes/journal"));
app.use("/api/forum", require("./routes/community"));
app.use("/api/counsellors", require("./routes/counsellors"));
app.use("/api/appointments", require("./routes/appointments"));


app.get('/api/health', (req,res) => res.json({ status: 'ok' }));

const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));