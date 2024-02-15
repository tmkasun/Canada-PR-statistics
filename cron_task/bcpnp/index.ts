import { JSDOM } from "jsdom";
import logger from "../libs/logger";
import { IBCPNPDraw, toDataObject, toMatrix } from "./utils";
import { Collection } from "mongodb";
const path = require("path");

/**
 * 
 * console.log('📕: error message');
console.log('📙: warning message');
console.log('📗: ok status message');
console.log('📘: action message');
console.log('📓: canceled status message');
console.log('📔: Or anything you like and want to recognize immediately by color');
 */
// https://gist.github.com/johannesjo/6b11ef072a0cb467cc93a885b5a1c19f reference
const itaPage =
  "https://www.welcomebc.ca/Immigrate-to-B-C/Invitations-To-Apply";

const mockFile = path.join(__dirname, "../resources/testing/mock.bcpnp.html");

export const getDrawsFromBCPNP = async (): Promise<any[]> => {
//   const dom = await JSDOM.fromFile(mockFile);
  // uncomment this line to fetch from the website
    const dom = await JSDOM.fromURL(itaPage);
  const { window } = dom;
  const { document } = window;
  const matrix = toMatrix(document.querySelector("table"));
  const draws: { [key: number]: IBCPNPDraw[] } = {};
  //   const [data, drawTypes, byDrawType] = toDataObject(matrix);
  //   for (const draw of data) {
  //     const drawEpoch = draw.date.getTime();
  //     if (!draws[drawEpoch]) {
  //       draws[drawEpoch] = [];
  //     }
  //     draws[drawEpoch].push(draw);
  //   }
  //   const drawsArray = Object.entries(draws).map(([date, draw]) => ({
  //     date,
  //     draw,
  //   }));
  //   return drawsArray.sort(
  //     ({ date: date1 }, { date: date2 }) => parseInt(date2) - parseInt(date1)
  //   );
  return toDataObject(matrix);
};

export const getLatestBCPNPFromDB = async (
  mongoCollection: Collection<Document> & {
    close?: (force?: boolean | undefined) => Promise<void>;
  },
  latestDrawDateFromBCPNP: Date
) => {
  logger.info("Finding last BCPNP invitations from mongo . . .");
  let lastKnownDraw = await mongoCollection.findOne<{
    lastDraw: Date;
    _id: any;
  }>({ program: "bcpnp" });
  if (!lastKnownDraw) {
    const done = await mongoCollection.insertOne({
      program: "bcpnp",
      lastDraw: latestDrawDateFromBCPNP,
    } as any);
    lastKnownDraw = { lastDraw: new Date(-1), _id: -1 };
  } else {
    logger.info(
      `Found latest BCPNP invitation from mongo = ${lastKnownDraw?.lastDraw}!`
    );
  }

  return lastKnownDraw;
};

// Following is a test to check if the function works
(async () => {
  await getDrawsFromBCPNP();
})();
