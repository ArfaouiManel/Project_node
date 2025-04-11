const express = require('express');
const router = express.Router();
const {
  createTicket,
  getTickets,
  updateTicket,
  deleteTicket, 
  getSummary, 
  getGraphData
} = require('../controllers/ticket.controller');
const { protect, isAdmin } = require('../middlewares/auth.middleware');

router.use(protect);

router.post('/createTicket', createTicket);
router.get('/getTicket', getTickets);
router.put('/updateTicket/:id', isAdmin, updateTicket);
router.delete('/deleteTicket/:id', isAdmin, deleteTicket);


router.get('/summary', getSummary);

// Tickets par jour pour graphiques
router.get('/graph-data', getGraphData);
module.exports = router;
