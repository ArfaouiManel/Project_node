const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');

// Ticket Routes
router.post('/createTicket', isAuthenticated, ticketController.createTicket);
router.get('/getTicket', isAuthenticated, ticketController.getTickets);
router.put('/updateTicket/:id', isAuthenticated, ticketController.updateTicket);
router.delete('/deleteTicket/:id', isAuthenticated, isAdmin, ticketController.deleteTicket);
router.post('/assignTicket/:id', isAuthenticated, isAdmin, ticketController.assignTicket);
router.get('/summary', isAuthenticated, ticketController.getSummary);
router.get('/graph-data', isAuthenticated, ticketController.getGraphData);

module.exports = router;
