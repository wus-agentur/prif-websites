// This script uses Puppeteer to scrape treaty participants
// and the dates of the signatures/accession/ratification/etc.
// from https://treaties.un.org into /content/data/treaties.json.

// It's additive, which means we can still edit treaties.json
// manually and this script won't overwrite our changes.

// @TODO: This should just read treaty URLs from treaties.json,
// and not create whole new entries.

import { DateTime } from "luxon"
import puppeteer from "puppeteer"
import fs from "fs"
import path from "path"
import { diff } from "just-diff"
import { exit } from "process"
import { fileURLToPath } from "url"
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const treatiesFile = path.join(__dirname, "../content/data/treaties.json")
console.log(`Reading existing treaties from ${treatiesFile}`)

const countries = JSON.parse(fs.readFileSync(path.join(__dirname, "../content/data/countries.json")))
const treaties = JSON.parse(fs.readFileSync(treatiesFile))

const pages = [
  { treaty: "cwc", url: "https://treaties.un.org/Pages/ViewDetails.aspx?src=TREATY&mtdsg_no=XXVI-3&chapter=26" },
  // { treaty: "tpnw", url: "https://treaties.un.org/Pages/ViewDetails.aspx?src=IND&mtdsg_no=XXVI-9&chapter=26&clang=_en" },
  // { treaty: "ccw", url: "https://treaties.un.org/Pages/ViewDetails.aspx?src=IND&mtdsg_no=XXVI-2&chapter=26&clang=_en" },
]

const nameSubs = {
  Türkiye: "Turkey",
  "Bolivia (Plurinational State of)": "Bolivia",
  "Brunei Darussalam": "Brunei",
  "Cabo Verde": "Cape Verde",
  Congo: "Republic of the Congo",
  "Côte d'Ivoire": "Ivory Coast",
  "Czech Republic": "Czechia",
  "Democratic Republic of the Congo": "DR Congo",
  "Holy See": "Vatican City",
  "Iran (Islamic Republic of)": "Iran",
  "Lao People's Democratic Republic": "Laos",
  "Micronesia (Federated States of)": "Micronesia",
  "Republic of Korea": "South Korea",
  "Republic of Moldova": "Moldova",
  "Russian Federation": "Russia",
  "Sao Tome and Principe": "São Tomé and Príncipe",
  "St. Kitts and Nevis": "Saint Kitts and Nevis",
  "St. Lucia": "Saint Lucia",
  "St. Vincent and the Grenadines": "Saint Vincent and the Grenadines",
  "State of Palestine": "Palestine",
  "Syrian Arab Republic": "Syria",
  "United Kingdom of Great Britain and Northern Ireland": "United Kingdom",
  "United Republic of Tanzania": "Tanzania",
  "Venezuela (Bolivarian Republic of)": "Venezuela",
  "Viet Nam": "Vietnam",
}

const eventTypes = {
  a: "accession",
  A: "acceptance",
  d: "succession",
}

let out = []

for (let i = 0; i < pages.length; i++) {
  const p = pages[i]
  let treatyRef = treaties.find((t) => t.name === p.treaty)
  let treaty = { ...treatyRef }

  if (!treaty) {
    console.log(`Couldn't find treaty "${p.treaty}", creating a new entry.`)
    treaty = {
      name: p.treaty,
    }
  } else {
    console.log(`Found treaty ${treaty.name} (${treaty.shortTitle || treaty.title || treaty.name}, ${treaty.participants.length} participants)`)
  }

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  page.on("console", async (msg) => {
    const msgArgs = msg.args()
    for (let i = 0; i < msgArgs.length; ++i) {
      console.log(await msgArgs[i].jsonValue())
    }
  })

  console.log(`Opening ${p.url}`)
  await page.goto(p.url)
  const container = await page.waitForSelector("#participants")

  const participants = await container.evaluate((el, eventTypes) => {
    const participants = []

    // Slice off the header row
    const rows = Array.from(el.querySelectorAll("tr")).slice(1)

    rows.forEach((row) => {
      const [countryEl, signedEl, treatyEventEl] = row.querySelectorAll("td")
      const events = []

      // Is the country a signatory?
      if (signedEl.innerText.trim() !== "") {
        events.push({ type: "signature", date: signedEl.innerText.trim().replace("\n", "") })
      }

      // Has the country ratified/accepted/etc. the treaty?
      if (treatyEventEl.innerText.trim() !== "") {
        const matches = treatyEventEl.innerText.trim().match(/(\d+ [a-zA-Z]+ \d+) ?([a-zA-Z]?)/)
        let eventType = "ratification"
        let eventDate = ""
        if (matches && matches[1]) {
          eventDate = matches[1]
        }
        if (matches && matches[2]) {
          eventType = eventTypes[matches[2]] || `Unknown treaty event type (${matches[2]})`
        }
        events.push({ type: eventType, date: eventDate })
      }
      participants.push({
        name: countryEl.innerText.replace(/(\d)|(\\n)/g, "").trim(),
        events: events,
      })
    })
    return participants
  }, eventTypes)

  await browser.close()
  //   const participants = JSON.parse(fs.readFileSync(path.join(__dirname, './tmp.json')))
  // fs.writeFileSync(path.join(__dirname, './tmp.json'), JSON.stringify(participants, null, '  '))
  console.log(`Found ${participants.length} treaty participants`)

  const treatyParticipants = participants.flatMap((p) => {
    // Find the corresponding country in countries.json
    const country = countries.find((c) => c.name.common === (nameSubs[p.name] || p.name))
    if (!country) {
      console.log(`Could not find country ${p.name}`)
      return []
    }
    const events = p.events.map((e) => {
      return { ...e, date: DateTime.fromFormat(e.date, "d MMM yyyy").toFormat("yyyy-MM-dd") }
    })
    return { cca2: country.cca2, events: events }
  })
  treaty.participants = treatyParticipants
  out.push(treaty)
}

const differences = diff(treaties, out)

if (differences.length === 0) {
  console.log(`Treaty data is already up-to-date.`)
  exit(2)
} else {
  console.log(`Treaty data has changed, writing new data ...`)
  fs.writeFileSync(treatiesFile, `${JSON.stringify(out, null, "  ")}\n`, "utf-8")
  exit(0)
}
