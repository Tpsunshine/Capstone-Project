const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require('dotenv').config();

const details = require("./details.json");
const SMTPTransport = require("nodemailer/lib/smtp-transport");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to Protecnic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport

try{
  console.log(user);
 console.log(process.env.EMAIL);
 

  let transporter = nodemailer.createTransport({
    service:'gmail',

  //host: "smtp.gmail.com",
  //  port: 587,
  //  secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
var emailaddress='jurivero@hotmail.com';
  let mailOptions = {
    from: '"Protecnic"<jurivero@hotmail.com>', // sender address
    to: emailaddress , // list of receivers
    subject: "Wellcome to Protecnic 👻", // Subject line
    html: `<h1>Hi ${user.name}</h1><br>
    <h4>Thanks for joining us</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}
catch(error) {
  console.log('That did not go well.')
  throw error
}
}
// main().catch(console.error);
