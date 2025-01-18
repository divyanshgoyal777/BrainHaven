const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const dotenv = require("dotenv");
dotenv.config();

const templates = {
  accountCreated: `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to BrainHaven</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      color: #333;
      line-height: 1.6;
    }
    .email-container {
      max-width: 600px;
      margin: 30px auto;
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #007bff;
      color: #ffffff;
      text-align: center;
      padding: 20px;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 1px;
    }
    .content {
      padding: 30px 20px;
      text-align: left;
    }
    .content h2 {
      font-size: 22px;
      color: #007bff;
      margin-bottom: 10px;
    }
    .content p {
      margin: 10px 0;
    }
    .cta-button {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 25px;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      font-size: 16px;
      font-weight: bold;
      border-radius: 4px;
      text-align: center;
      transition: background-color 0.3s ease;
    }
    .cta-button:hover {
      background-color: #0056b3;
    }
    .footer {
      background-color: #f8f9fa;
      text-align: center;
      padding: 15px;
      font-size: 14px;
      color: #6c757d;
    }
    .footer a {
      color: #007bff;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      BrainHaven
    </div>
    <div class="content">
  <h2>Welcome, {{firstName}}!</h2>
  <p>Hi {{firstName}} {{lastName}},</p>
  <p>
    Your account on <strong>BrainHaven – Ignite Your Tech Journey</strong> is now live!
    We're excited to have you on board as you dive into our vast library of coding resources, detailed roadmaps, hackathon updates, and more. Explore the tools that will elevate your tech journey and join like-minded innovators in our HackMate community, where you can create teams, collaborate, and chat with teammates.
  </p>
  <p>If you have any questions, our support team is always here to assist you.</p>
  <a href="https://brainhaven.in/login" class="cta-button">Login and Start Exploring</a>
</div>
<div class="footer">
  <p>© 2025 BrainHaven. All rights reserved.</p>
  <p>
    Discover more: 
    <a href="https://brainhaven.in">BrainHaven</a>
  </p>
</div>
</body>
</html>
  `,
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "brainhaven777@gmail.com",
    pass: process.env.SMTP_EMAIL_PASS,
  },
});

async function sendMail(to, subject, templateName, variables) {
  const templateSource = templates[templateName];
  if (!templateSource) {
    throw new Error(`Template "${templateName}" not found.`);
  }

  const template = handlebars.compile(templateSource);
  const html = template(variables);

  const info = await transporter.sendMail({
    from: '"BrainHaven" <brainhaven777@gmail.com>',
    to,
    subject,
    html,
  });
}

module.exports = { sendMail };
