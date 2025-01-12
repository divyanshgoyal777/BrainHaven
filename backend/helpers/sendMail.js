const nodemailer = require("nodemailer");
const handlebars = require("handlebars");

const templates = {
  accountCreated: `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to BrainWave</title>
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
      BrainWave
    </div>
    <div class="content">
      <h2>Welcome, {{firstName}}!</h2>
      <p>Dear {{firstName}} {{lastName}},</p>
      <p>
        Your account on <strong>BrainWave – Ignite Your Tech Journey</strong> has been created successfully!
        We're thrilled to have you join us on this exciting journey. Explore expertly curated coding roadmaps, stay updated on hackathons, and access a wealth of learning resources tailored for tech enthusiasts like you.
      </p>
      <p>If you have any questions, our support team is here to help.</p>
      <a href="https://brainwave.example.com/login" class="cta-button">Login to Your Account</a>
    </div>
    <div class="footer">
      <p>© 2025 BrainWave. All rights reserved.</p>
      <p>
        Visit our website: 
        <a href="https://brainwave.example.com">BrainWave</a>
      </p>
    </div>
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
    user: "777divyanshgoyal@gmail.com",
    pass: "oztdddqswuloytrw",
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
    from: '"BrainWave" <777divyanshgoyal@gmail.com>',
    to,
    subject,
    html,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = { sendMail };
