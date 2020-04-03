const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

//new Email(user,url).sendWelcome();

module.exports = class EmailAdmin {
  constructor(user) {
    this.message = user.message;
    this.phone = user.phone;
    this.to = `${process.env.EMAIL_FROM}`;
    this.firstName = user.fullname.split(' ')[0];
    this.from = user.emailInfo;
  }
  newTransport() {
    if (process.env.NODE_ENV === 'development') {
      // SendGrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }
    //1.Create a transporter
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 25 || 465,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
      //Activate in gmail "less secure app" option
    });
  }

  async sendAdmin(template, subject) {
    //Send the actual email
    //1. Render HTML based on template
    const html = pug.renderFile(
      `${__dirname}/../Views/Emails/${template}.pug`,
      {
        firstName: this.firstName,
        subject,
        message: this.message,
        emailInfo: this.from,
        phone: this.phone
      }
    );
    //2. Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };
    //3. Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }
  async sendContact() {
    await this.sendAdmin(`contact`, 'You have a new contact request!');
  }
};
