import { Resend } from "resend";
import { JSDOM } from "jsdom";
const path = require("path");

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

let resendInstance: Resend | null = null;
const initResend = (): Resend => {
  if (resendInstance) {
    return resendInstance;
  }
  resendInstance = new Resend(RESEND_API_KEY);
  return resendInstance;
};

export const sendEmail = async (
  to: string[] | string,
  html: string,
  subject: string
) => {
  const resend = initResend();
  console.info(`Sending email! ${subject}`);
  let emailDone = null;
  try {
    emailDone = await resend.emails.send({
      from: "noreply@send.knnect.com",
      to,
      replyTo: "tmkasun+canprsubs@gmail.com",
      subject,
      html,
    });
  } catch (error) {
    console.error(`Error sending email! ${error}`);
    console.error(error);
  }

  return emailDone;
};
const filePath = path.join(process.cwd(), "/src/utils/verificationEmail.html");

export const sendVerificationEmail = async (email: string, uuid: string) => {
  const emailTemplate = await JSDOM.fromFile(filePath);
  const verificationEndpoint = `https://canpr.knnect.com/subscribe?email=${encodeURIComponent(
    email
  )}&code=${uuid}`;
  const verifyUrl = emailTemplate.window.document.querySelector("#verifyUrl");
  if (verifyUrl) {
    verifyUrl.innerHTML = verificationEndpoint;
  }
  const verifyLink = emailTemplate.window.document.querySelector("#verifyLink");
  if (verifyLink) {
    verifyLink.setAttribute("href", verificationEndpoint);
  }
  const emailDone = await sendEmail(
    email,
    emailTemplate.serialize(),
    "CanPR Subscription Verification"
  );
  return emailDone;
};
