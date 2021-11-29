const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const config = require("./lib/config").config;
const util = require("./lib/util");

// parse config
let scheduled = [];
for (const key in config.schedules) {
    console.log(key, config.schedules[key]);
    scheduled.push([util.parseTimeStringToNumber(config.schedules[key][0]), util.parseTimeStringToNumber(config.schedules[key][1])]);
}

// parse input
let filepath = null;
process.argv.forEach((value, index) => {
    // console.log(value, index);
    if (value && index===2) {
        filepath = value;
    }
});
let paths = filepath.split("/");

// show results
let movies = [];
fs.createReadStream(path.resolve(__dirname, ...paths))
.pipe(csv.parse({ headers: true }))
.on('error', error => console.error(error))
.on('data', row => {
    movies.push(util.parseMovie(row));
})
.on('end', rowCount => {
    for (const i in scheduled) {
        console.log("--------------------------------------------");
        console.log(util.getDay(i));
        console.log("--------------------------------------------");
        console.log();
        for (const j in movies) {
            const times = util.getTimes(scheduled[i][0], scheduled[i][1], movies[j]["Run Time Minutes"], config.nearest, config.rest, []);
            console.log(`${movies[j]["Movie Title"]} - Rated ${movies[j]["MPAA Rating"]}, ${movies[j]["Run Time"]}`);
            console.log();
            for (const k in times) {
                console.log(`${times[k][0]} - ${times[k][1]}`);
            }
            console.log();
        }
    }
});