import nodemailer, { SentMessageInfo, Transporter } from "nodemailer";
import "dotenv/config";

import { MailOptions } from "./types";


class Mailer {
  private static _instance: Mailer;
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "",
      // port: 465,
      // secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.MAIL_USER || "",  
        pass: process.env.MAIL_PASS || "",     
        // in your env please fill in this for the MAIL_USER AND MAIL_PASS AND THE MAIL_HOST
      },
    });
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new Mailer();
    }

    return this._instance;
  }

  validateMailOptions(mailOptions: MailOptions) {
    if (!mailOptions.to) {
      throw new Error("MailOptions.to is required");
    }

    if (!mailOptions.subject) {
      throw new Error("MailOptions.subject is required");
    }

    if (!mailOptions.text && !mailOptions.html) {
      throw new Error("MailOptions.text or MailOptions.html is required");
    }
  }

 
  async sendMail(mailOptions: MailOptions): Promise<SentMessageInfo> {
    const sender = "";
    this.validateMailOptions(mailOptions);
    if (process.env.NODE_ENV === "development") {
      console.log("Sending email to: ", mailOptions.to);
      console.log("Email subject: ", mailOptions.subject);
      console.log("Email text: ", mailOptions.text || mailOptions.html);
      return;
    }
 
  }
}

export default Mailer.getInstance();
// note: This mail sender just sends the info to the console because we assume were in development but if you want to send actual mails you can fill in your mail details 