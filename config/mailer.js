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
      subject: ` Mise à jour du ticket : ${ticket.title}`,
      text: `Le ticket a été mis à jour. Nouveau statut: ${ticket.status}`
    });
    console.log("Email envoyé: " + info.response);
  } catch (err) {
    console.error("Erreur envoi email:", err.message);
  }
};