import { text } from "express";
import nodemailer from "nodemailer";

async function createTransporter() {
  const testAccount = await nodemailer.createTestAccount();

  let transportSettings = {
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  };
  const transport = await nodemailer.createTransport(transportSettings);

  return { transport, testAccount };
}

export const sentOIP = async ({ email }) => {
  const { transport, testAccount } = await createTransporter();
  let otp = Number.parseInt(Math.random() * 100000);
  const testEmail = await transport.sendMail({
    from: testAccount.user,
    to: email,
    subject: "email verfiction",
    text: `this is your verfiction code ${otp}`,
  });

  console.log(nodemailer.getTestMessageUrl(testEmail));
  return otp ;
};
