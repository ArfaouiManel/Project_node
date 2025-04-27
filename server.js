require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const User = require('./models/user.model'); 
const ticketRoutes = require('./routes/ticket.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const viewRoutes = require('./routes/view.routes');
const connectDB = require('./config/db');
const bcrypt = require('bcrypt');

const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/auth', authRoutes);
app.use('/', viewRoutes);

module.exports = app;
app.use(express.static(path.join(__dirname, 'views')));

const createAdminIfNotExist = async () => {
  try {
    // Check if admin user exists
    const admin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (admin) {
      console.log('Admin user already exists');
      return;
    }

    // If not, create the admin user
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10); // Hash the admin password
    const newAdmin = new User({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin',
    });

    // Save the new admin user
    await newAdmin.save();
    console.log('Admin user created');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

createAdminIfNotExist();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
