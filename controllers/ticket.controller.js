const Ticket = require('../models/ticket.model');
const User = require('../models/user.model');
const { sendTicketUpdateEmail } = require('../config/mailer');

// Créer un ticket
exports.createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    const ticket = await Ticket.create({
      title,
      description,
      createdBy: req.user.id
    });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: 'Erreur création ticket', error: err.message });
  }
};

// Lister les tickets (admin voit tout, user voit ses tickets)
exports.getTickets = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { createdBy: req.user.id };
    const tickets = await Ticket.find(filter).populate('createdBy assignedTo');
    
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: 'Erreur liste tickets', error: err.message });
  }
};

// Mettre à jour le statut / assignation
exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket introuvable' });

    const { status } = req.body;
    if (status) ticket.status = status;

    await ticket.save();
    await sendTicketUpdateEmail(ticket);

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: 'Erreur mise à jour ticket', error: err.message });
  }
};

// Supprimer un ticket
exports.deleteTicket = async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ticket supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur suppression', error: err.message });
  }
};


exports.getSummary = async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments();
    const openTickets = await Ticket.countDocuments({ status: 'ouvert' });
    const inProgressTickets = await Ticket.countDocuments({ status: 'en cours' });
    const closedTickets = await Ticket.countDocuments({ status: 'clôturé' });
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });

    res.json({
      totalTickets,
      openTickets,
      inProgressTickets,
      closedTickets,
      totalUsers,
      totalAdmins
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
};

// Tickets par jour pour graphiques
exports.getGraphData = async (req, res) => {
  try {
    const data = await Ticket.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const labels = data.map(item => item._id);
    const values = data.map(item => item.count);

    res.json({ labels, values });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
};