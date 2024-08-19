import axios from "axios";
import { JSDOM } from "jsdom";
import fs from "fs";
const url =
  "https://www.ontario.ca/page/oinp-express-entry-notifications-interest";

async function scrapeOINPDraws() {
  try {
    const dom = await JSDOM.fromURL(url);

    const { document } = dom.window;

    const drawSections = document.querySelectorAll("h2");
    for (const drawSection of drawSections) {
      const drawTable =
        drawSection?.nextElementSibling?.nextElementSibling?.nextElementSibling?.querySelector(
          "table"
        );

      if (drawTable) {
        console.log(drawTable);
      }
    }
    debugger;

    // TODO: Write code to parse the data using document.querySelector or other DOM methods

    // TODO: Store the parsed data in a JSON object

    // TODO: Write the JSON object to a file
  } catch (error) {
    console.error("Error:", error);
  }
}

scrapeOINPDraws();
