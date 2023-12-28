import { Resend } from "resend";
import { Draw } from "./types";
const { resendAPIKey, subscribers } = require("../configs.json");
import { JSDOM } from 'jsdom';
import logger from "./logger";
import { OINPDraw } from "../oinp";

const path = require('path');
const filePath = path.join(__dirname, 'resources/ee_pr.html');

let resendInstance: Resend | null = null;
const initResend = (): Resend => {
    if (resendInstance) {
        return resendInstance
    }
    resendInstance = new Resend(resendAPIKey);
    return resendInstance
}

export const sendEmail = async (to: string[], html: string, subject: string) => {
    const resend = initResend();
    logger.info(`Sending email! ${subject}`);

    const emailDone = await resend.emails.send({
        from: 'noreply@send.knnect.com',
        to: to.join(','),
        subject,
        html,
    });
    return emailDone
}

export const sendEEEmail = async (latestDrawFromIRCC: Draw, latestDrawNumberFromIRCC: number) => {
    const emailTemplate = await JSDOM.fromFile(filePath);
    const header = emailTemplate.window.document.querySelector('#draw-header')
    if (header) {
        header.innerHTML = latestDrawFromIRCC.drawName;
    }
    const emailDone = await sendEmail(
        subscribers.ee,
        `New PR draw round ${latestDrawNumberFromIRCC} detected!`,
        emailTemplate.serialize()
    );
    return emailDone
}

export const sendOINPEmail = async (oinpRound: OINPDraw) => {
    const emailTemplate = await JSDOM.fromFile(filePath);
    const header = emailTemplate.window.document.querySelector('#draw-header')
    if (header) {
        header.innerHTML = oinpRound.details;
    }
    const emailDone = await sendEmail(
        subscribers.oinp,
        `New OINP Invitation Round detected!`,
        emailTemplate.serialize()
    );
    return emailDone
}