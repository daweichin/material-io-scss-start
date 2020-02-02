const puppeteer = require("puppeteer");
console.log("scrapping started");

async function scrape(url) {
  console.log("the url is " + url);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1000,
    height: 600
  });
  await page.goto(url);

  // primary
  let [el] = await page.$x(
    "/html/body/div/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/div/p"
  );
  let $primary = await el.getProperty("textContent");
  $primary = await $primary.jsonValue();

  // p-light
  let [el1] = await page.$x(
    "/html/body/div/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/ul/li[1]/p[2]"
  );
  let $p_light = await el1.getProperty("textContent");
  $p_light = await $p_light.jsonValue();

  // p-dark
  let [el2] = await page.$x(
    "/html/body/div/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/ul/li[2]/p[2]"
  );
  let $p_dark = await el2.getProperty("textContent");
  $p_dark = await $p_dark.jsonValue();

  // secondary
  let [el3] = await page.$x(
    "/html/body/div/div[3]/div[2]/div[1]/div[2]/div[1]/div[1]/ul/li[2]/p[2]"
  );
  let $secondary = await el3.getProperty("textContent");
  $secondary = await $secondary.jsonValue();

  // s-light
  let [el4] = await page.$x(
    "/html/body/div/div[3]/div[2]/div[1]/div[2]/div[2]/div[1]/ul/li[1]/p[2]"
  );
  let $s_light = await el4.getProperty("textContent");
  $s_light = await $s_light.jsonValue();

  // s-dark
  let [el5] = await page.$x(
    "/html/body/div/div[3]/div[2]/div[1]/div[2]/div[2]/div[1]/ul/li[2]/p[2]"
  );
  let $s_dark = await el5.getProperty("textContent");
  $s_dark = await $s_dark.jsonValue();

  console.log({ $primary, $p_light, $p_dark, $secondary, $s_light, $s_dark });

  await browser.close();
  return { $primary, $p_light, $p_dark, $secondary, $s_light, $s_dark };
}

module.exports = scrape;
