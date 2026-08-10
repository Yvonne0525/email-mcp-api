const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { to, subject, text } = req.body;
  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 587,
    secure: false,
    auth: { user: process.env.QQ_MAIL, pass: process.env.QQ_PASS }
  });
  await transporter.sendMail({ from: process.env.QQ_MAIL, to, subject, text });
  res.status(200).json({ success: true });
}
