const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({width: 1000, height: 500});
    await page.goto("https://play.anghami.com/login");

    await Promise.all([
      await page.click(".other-login-btn"),
      page.waitForNavigation({ waitUntil: "networkidle0" })
    ]);

    await page.type("#ang_app > anghami-login-page > div > div.login-section > anghami-main-login > div > anghami-more-ways-login > div > div > form > span > input", process.env.email,{delay:100});
    
    // await page.screenshot({ path: "destination.png" });

    await browser.close();
  } catch (error) {
    console.error();
  }
})();
