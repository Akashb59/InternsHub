const nodemailer = require('nodemailer');
const pug = require('pug');

const htmlToText = require('html-to-text');

//new Email(user,url).sendWelcome();
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.fullname.split(' ')[0];
    this.url = url;
    this.from = `InternsHub Admin <${process.env.EMAIL_FROM}>`;
  }
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
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
  async send(template, subject) {
    //Send the actual email
    //1. Render HTML based on template
    const html = pug.renderFile(
      `${__dirname}/../Views/Emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject
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
  async sendWelcomeStudent() {
    await this.send(`welcome`, 'Welcome to InternsHub!');
  }
  async sendWelcomeCompany() {
    await this.send(`welcomeCompany`, 'Welcome to InternsHub!');
  }
  async sendPasswordReset() {
    await this.send(
      `passwordReset`,
      'Your password reset token is valid for only 10 minutes!'
    );
  }
};
