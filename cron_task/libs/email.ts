import { Resend } from "resend";
import { Draw } from "./types";
const { resendAPIKey, subscribers } = require("../configs.json");
import { JSDOM } from "jsdom";
import logger from "./logger";
import { OINPDraw } from "../oinp";
import { IBCPNPDraw } from "../bcpnp/utils";

const path = require("path");
const filePath = path.join(__dirname, "../resources/ee_pr.html");
const oinpEmailTemplate = path.join(__dirname, "../resources/oinp_email.html");

let resendInstance: Resend | null = null;
const initResend = (): Resend => {
  if (resendInstance) {
    return resendInstance;
  }
  resendInstance = new Resend(resendAPIKey);
  return resendInstance;
};

export const sendEmail = async (
  to: string[] | string,
  html: string,
  subject: string
) => {
  const resend = initResend();
  logger.info(`Sending email! ${subject}`);
  let emailDone = null;
  try {
    emailDone = await resend.emails.send({
      from: "noreply@send.knnect.com",
      to,
      subject,
      html,
    });
  } catch (error) {
    logger.error(`Error sending email! ${error}`);
    logger.error(error);
  }

  return emailDone;
};

export const sendEEEmail = async (
  latestDrawFromIRCC: Draw,
  latestDrawNumberFromIRCC: number
) => {
  const emailTemplate = await JSDOM.fromFile(filePath);
  const header = emailTemplate.window.document.querySelector("#draw-header");
  if (header) {
    header.innerHTML = latestDrawFromIRCC.drawName;
  }
  const emailDone = await sendEmail(
    subscribers.ee,
    emailTemplate.serialize(),
    `New PR draw round ${latestDrawNumberFromIRCC} detected!`
  );
  return emailDone;
};

export const sendOINPEmail = async (oinpRound: OINPDraw) => {
  const emailTemplate = await JSDOM.fromFile(oinpEmailTemplate);
  const header = emailTemplate.window.document.querySelector("#draw-header");
  const drawTitleText = "Ontario Immigration Nominee Program Update";
  const drawTitle = emailTemplate.window.document.querySelector("#draw-title");
  if (drawTitle) {
    drawTitle.textContent = drawTitleText;
  }
  if (header) {
    header.innerHTML = oinpRound.details;
  }
  const emailDone = await sendEmail(
    subscribers.oinp,
    emailTemplate.serialize(),
    `New OINP Invitation Round detected!`
  );
  return emailDone;
};

export const sendBCPNPmail = async (bcPNPRound: IBCPNPDraw[]) => {
  const emailTemplate = await JSDOM.fromFile(oinpEmailTemplate);
  const header = emailTemplate.window.document.querySelector("#draw-header");
  const detailsLink = emailTemplate.window.document.querySelector(
    "#draw-view-details"
  ) as HTMLAnchorElement;
  if (detailsLink) {
    detailsLink.href =
      "https://www.welcomebc.ca/Immigrate-to-B-C/Invitations-To-Apply";
  }
  const isTechDrawAvailable = bcPNPRound.find((draw) =>
    draw.drawType.includes("Tech")
  );
  const drawTitleText = "British Colombia Provincial Nominee Program Update";
  const drawTitle = emailTemplate.window.document.querySelector("#draw-title");
  if (drawTitle) {
    drawTitle.textContent = drawTitleText;
  }
  const drawDescription =
    emailTemplate.window.document.querySelector("#draw-description");
  if (drawDescription) {
    drawDescription.innerHTML = `The following <b> ${bcPNPRound
      .map((draw) => draw.drawType)
      .join(" , ")} </b> draws were found`;
  }
  if (header) {
    header.innerHTML = `New ${
      isTechDrawAvailable
        ? "Tech ( Min score: " + isTechDrawAvailable.minScore + " )"
        : ""
    } BC PBP Invitation Round detected!`;
  }
  const emailDone = await sendEmail(
    subscribers.bcpnp,
    emailTemplate.serialize(),
    `New ${isTechDrawAvailable ? "Tech" : ""} BC PBP Invitation Round detected!`
  );
  return emailDone;
};
