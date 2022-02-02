const Port = process.env.PORT || 3090
const express = require("express")
const { Cluster } = require("puppeteer-cluster")
const cors = require('cors')
const app = express()
app.use(cors())

app.get('/result', (req, res) => {
    console.log('Hello')
})

app.get('/result', (req, res) => {
    (async () => {
        const cluster = await Cluster.launch({
            concurrency: Cluster.CONCURRENCY_CONTEXT,
            maxConcurrency: 2,
        })

        //Define functions
        const wtrTemp = async ({ page, data: url }) => {
            await page.goto(url);
            const tmp = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('#c_grafico_temp_agua_txt_grados_agua_actual strong')).map(x => x.textContent)
            });
            
            res.json(tmp[0])
        }

        //Get the data
        cluster.queue('https://tides4fishing.com/au/new-south-wales/merimbula#_water_temp', wtrTemp);
        
        await cluster.idle();
        await cluster.close();
    })();
})

app.get('/tides', (req, res) => {

    (async () => {
        const cluster = await Cluster.launch({
            concurrency: Cluster.CONCURRENCY_CONTEXT,
            maxConcurrency: 2,
        })

        //Define functions
        const tides = async ({ page, data: url }) => {
            await page.goto(url);
            const tide = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('#tides-today > p')).map(x => x.textContent)
            
            });

            const newTides = tide[0].replace(/,/g, ".")
            res.json(newTides)
        }

        //Get the data
        cluster.queue('https://www.tidetime.org/australia-pacific/australia/merimbula.htm', tides);

        await cluster.idle();
        await cluster.close();
    })();

})

app.listen(Port, () => console.log(`server running on PORT ${Port}`))