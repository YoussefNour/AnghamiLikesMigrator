const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
const fs = require("fs");
const { count } = require("console");
dotenv.config();

(async () => {
  try {
    //initialising browser
    const browser = await puppeteer.launch({headless: false, devtools: true, args: ['--disable-web-security', '--disable-features=IsolateOrigins', ' --disable-site-isolation-trials']});
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 500 });
    await page.goto("https://play.anghami.com/login");

    //choosing login type
    await Promise.all([
      await page.click(".other-login-btn"),
      await delay(1000)
    ]);

    //typing email
    await page.waitForSelector(
      "#ang_app > anghami-login-page > div > div.login-section > anghami-main-login > div > anghami-more-ways-login > div > div > form > span > input"
    );
    await page.type(
      "#ang_app > anghami-login-page > div > div.login-section > anghami-main-login > div > anghami-more-ways-login > div > div > form > span > input",
      process.env.email
    );

    await page.click(
      "#ang_app > anghami-login-page > div > div.login-section > anghami-main-login > div > anghami-more-ways-login > div > div > form > button"
    ),
      //typing password
      await page.waitForSelector('input[name="password"]');

    await page.type('input[name="password"]', process.env.password);

    await Promise.all([
      await page.click(
        "#ang_app > anghami-login-page > div > div.login-section > anghami-main-login > div > anghami-fill-email-password > div > div > form > button"
      ),
      page.waitForNavigation({ waitUntil: "networkidle0" })
    ]);

    await Promise.all([
      await page.click("#ang-nav > div > ul > li.mymusic-compact-menu > a"),
      page.waitForNavigation({ waitUntil: "networkidle0" })
    ]);
    await delay(1000);
    const likes = await page.evaluate(() => {
      songs = [];
      songcount = document.querySelector("#base_content > div > anghami-mymusic-new > div > div > div.mymusic-displayed-content.ang-view > div > div > div.tabbed-section-title-parent > div.num-songs-container > span.num-songs").innerText;
      songcount = songcount.replace(",","");
      var nosongs = parseInt(songcount);
      console.log("number of likes "+nosongs);
      for(let count = 1;count<=nosongs;count++){
        //delay(200);
        console.log("iteration "+count);
        songName = document.querySelector(`#base_content > div > anghami-mymusic-new > div > div > div.mymusic-displayed-content.ang-view > div > anghami-new-section-builder > div:nth-child(2) > div > anghami-list-section > div > div > div > div:nth-child(${count}) > div.cell.cell-title > span`).innerText;
        songAuthor = document.querySelector(`#base_content > div > anghami-mymusic-new > div > div > div.mymusic-displayed-content.ang-view > div > anghami-new-section-builder > div:nth-child(2) > div > anghami-list-section > div > div > div > div:nth-child(${count}) > div.cell.cell-artist > a`).innerText;
        if(count%10==0){
          window.scrollBy(0,window.innerHeight);
          delay(100);
        }
        song = { id: count, track: songName, author: songAuthor };
        console.log(song);
        songs.push(song);  
      }
      return songs;
    });
    console.log(likes);
    console.log("finished scraping");
    //closing the browser
    //await browser.close();
  } catch (error) {
    console.error();
  }
})();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
