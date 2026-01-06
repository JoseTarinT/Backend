const express = require("express");
const puppeteer = require("puppeteer");
const { Cluster } = require("puppeteer-cluster");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");
const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(process.env.API);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/result", (req, res) => {
  // async function scrapeTemperature() {
  //   const browser = await launch({ args: ["--no-sandbox"] });
  //   const page = await browser.newPage();
  //   await page.goto(
  //     "https://tides4fishing.com/au/new-south-wales/merimbula#_water_temp"
  //   );

  //   const tmp = await page.evaluate(() => {
  //     return Array.from(
  //       document.querySelectorAll(
  //         "#c_grafico_temp_agua_txt_grados_agua_actual strong"
  //       )
  //     ).map((x) => x.textContent);
  //   });

  //console.log({watrTemp: tmp[0]})
  // res.json("tmp[0]");
  // await browser.close();
  // }

  // scrapeTemperature();
  res.json("Not available");
});

app.get("/tides", async (req, res) => {
  //   async function scrapeTides() {
  //     const browser = await launch({ args: ["--no-sandbox"] });
  //     const page = await browser.newPage();
  //     await page.goto(
  //       "https://www.tidetime.org/australia-pacific/australia/merimbula.htm"
  //     );

  //     const tide = await page.evaluate(() => {
  //       return Array.from(document.querySelectorAll("#tides-today > p")).map(
  //         (x) => x.textContent
  //       );
  //     });

  //console.log(tide[0])
  //   res.json(tide[0]);
  // await browser.close();
  //   }

  //   scrapeTides();
  res.json("Not available");
});

app.listen(process.env.PORT || 3080, () =>
  console.log(`Server running on PORT ${process.env.PORT || 3080}`)
);
