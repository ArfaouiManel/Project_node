require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const ticketRoutes = require('./routes/ticket.routes');
const authRoutes = require('./routes/auth.routes');
const viewRoutes = require('./routes/view.routes');


const connectDB = require('./config/db');


const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/tickets', ticketRoutes);
app.use('/api/auth', authRoutes);
app.use('/', viewRoutes);


module.exports = app;

app.use(express.static(path.join(__dirname, 'views')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
