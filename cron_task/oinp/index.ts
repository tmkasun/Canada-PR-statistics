import axios from "axios";
import logger from "../libs/logger";
import { Collection } from "mongodb";
import { JSDOM } from "jsdom";

// Change the URL when year changes
const pUpdates2025 =
  "https://www.ontario.ca/page/2025-ontario-immigrant-nominee-program-updates";
const noi =
  "https://www.ontario.ca/page/oinp-express-entry-notifications-interest";

export type OINPDraw = { date: Date; details: string };
export type OINPDraws = OINPDraw[];
const printSorted = (sortedDraws: string[]) => {
  let i = 0;
  for (let draw of sortedDraws) {
    logger.info(`i = ${i} ${draw}`);
    i++;
  }
};

export const getLatestOINPFromDB = async (
  mongoCollection: Collection<Document> & {
    close?: (force?: boolean | undefined) => Promise<void>;
  },
  latestDrawNumberFromOINP: Date
) => {
  logger.info("Finding last OINP invitations from mongo . . .");
  let lastKnownDraw = await mongoCollection.findOne<{
    lastDraw: Date;
    _id: any;
  }>({ program: "oinp" });
  if (!lastKnownDraw) {
    const done = await mongoCollection.insertOne({
      program: "oinp",
      lastDraw: latestDrawNumberFromOINP,
    } as any);
    lastKnownDraw = { lastDraw: new Date(-1), _id: -1 };
  } else {
    logger.info(
      `Found latest OINP invitation from mongo = ${lastKnownDraw?.lastDraw}!`
    );
  }

  return lastKnownDraw;
};

/**
 * Fetches the latest OINP invitations from ontario.ca website and returns the sorted list of draws.
 */
export const getDrawsFromOINP = async (): Promise<OINPDraws> => {
  logger.info("Fetching latest OINP invitations from ontario.ca website...");
  const draws = new Set();
  const drawsMap: { [key: string]: string } = {};
  const dom = await JSDOM.fromURL(pUpdates2025);
  const { window } = dom;
  const { document } = window;
  const drawNodes = document.querySelectorAll("h3");
  if (drawNodes.length === 0) {
    logger.warn("No draw nodes found on the OINP page!");
    return [];
  }
  for (const drawNode of drawNodes) {
    let drawDate = drawNode.textContent || "";
    drawDate = drawDate.trim();
    const drawDetailsNode = drawNode.nextElementSibling;
    if (drawDetailsNode === null) {
      logger.warn(`Skipping ${drawDate} as it is an info bulletin`);
      continue;
    }
    const drawDetailsText = drawDetailsNode.textContent || "";
    if (!draws.has(drawDate)) {
      draws.add(drawDate);
      drawsMap[drawDate] = drawDetailsText;
    }
  }

  const sortedDraws: OINPDraws = Array.from(draws)
    .map((draw) => {
      return {
        date: new Date(draw as string),
        details: drawsMap[draw as string],
      };
    })
    .sort((a: any, b: any) => b.date - a.date);
  // printSorted(sortedDraws);
  return sortedDraws;
};

// Uncomment to test, otherwise this file is used as a module
getDrawsFromOINP();
