const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

exports.sendTicketUpdateEmail = async (ticket) => {
  try {
    const info = await transporter.sendMail({
      from: `Support ticket ${process.env.MAIL_USER}`,
      to: 'manelarfaoui04@gmail.com', 
      subject: `Mise à jour du ticket : ${ticket.title}`,
      text: `Le ticket a été mis à jour. Nouveau statut: ${ticket.status}`
    });
    console.log("Email envoyé: " + info.response);
  } catch (err) {
    console.error("Erreur envoi email:", err.message);
  }
};

exports.sendTicketAssignmentEmail = async (ticket, user) => {
  try {
    const info = await transporter.sendMail({
      from: `Support ticket ${process.env.MAIL_USER}`,
      to: user.email,
      subject: `Nouveau ticket assigné : ${ticket.title}`,
      text: `Un nouveau ticket vous a été assigné.\n\nTitre: ${ticket.title}\nDescription: ${ticket.description}\nStatut: ${ticket.status}`
    });
    console.log("Email d'assignation envoyé: " + info.response);
  } catch (err) {
    console.error("Erreur envoi email d'assignation:", err.message);
  }
};