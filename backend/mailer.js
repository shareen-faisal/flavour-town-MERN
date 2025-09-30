const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: '221400013@gift.edu.pk',     
    pass: 'pmzk qhqh pupo nvcq'         
  }
});

const sendMail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: '"Flavour Town" <221400013@gift.edu.pk>',
      to,
      subject,
      html, 
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};

module.exports = { sendMail };
