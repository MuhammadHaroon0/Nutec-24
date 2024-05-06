const nodemailer = require("nodemailer");

class Email {
  constructor(user) {
    this.to = user.email;
    this.from = process.env.MAIL_SENDER;
    this.name = user.name;
  }
  newTransport() {
    // if (process.env.NODE_ENV === "production") return 1;
    return nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    console.log("AS");
  }
  async send(subject, template) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: template,

    };
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome(token) {
    await this.send("Welcome :)", `Welcome to FitConnect, <a href="${process.env.BACKEND_URL}/users/verify/${token}">Click on this link to verify your account!</a>`); //signing up the user
  }



  async sendResetPassword(resetUrl) {
    await this.send(
      "Passsword Reset",
      `<h1>
      Forgot your password? Submit a 
      patch request with your new password 
      and passwordConfirm to <a href='${resetUrl}'>${resetUrl}</a>.
       If you don't forget your password just ignore this message)
      </h1>`
    );
    //forgot password
  }
}

module.exports = Email;