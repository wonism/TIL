var nodemailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');
var config = require('./config/config.json');

var sender = '보내는 사람 < SENDER@gmail.com >';
var receiver = 'RECEIVER@gmail.com';
var mailTitle = '메일 제목';
var html = '<h1>HTML TEST</h1>';

var mailOptions = {
  from: sender,
  to: receiver,
  subject: mailTitle,
  html: html
};

var transporter = nodemailer.createTransport(smtpPool({
  service: config.mailer.service,
  host: config.mailer.host,
  port: config.mailer.port,
  auth: {
    user: config.mailer.user,
    pass: config.mailer.password
  },
  tls: {
    rejectUnauthorize: false
  },
  maxConnections: 5,
  maxMessages: 10
}));

transporter.sendMail(mailOptions, function (err, res) {
  if (err) {
    console.log('failed... => ' + err);
  } else {
    console.log('succeed... => ' + res);
  }
  transporter.close();
});

