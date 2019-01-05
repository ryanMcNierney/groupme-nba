const rp = require('request-promise')
const $ = require('cheerio')
const playerIds = require('./playerIds')
const axios = require('axios')

// function for title case
// const toTitleCase = str => {
//     str = str.toLowerCase().split(' ');
//     for (var i = 0; i < str.length; i++) {
//         str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
//     }
//     return str.join(' ');
// }

const avgStats = (messageText) => {

    return new Promise((resolve, reject) => {
        // clean the player name
        const playerStr = messageText.slice(7)

        // get the id from playerIds.js
        const id = playerIds[playerStr]

        // build the url the scrape
        const url = `http://rotoworld.com/player/nba/${id}`

        // make the call to rotoworld
        rp(url)
            .then(html => {
                // success!

                // scrape the stats table
                const avgSeasonStats = $('#cp1_ctl01_pnlPlayerStats > table:nth-of-type(1) > tbody > tr:nth-of-type(4) > td', html)

                // get the stats
                const pts = avgSeasonStats['17'].children[0].data
                const rbs = avgSeasonStats['18'].children[0].data
                const ast = avgSeasonStats['19'].children[0].data
                const stl = avgSeasonStats['20'].children[0].data
                const blk = avgSeasonStats['22'].children[0].data
                const to = avgSeasonStats['21'].children[0].data

                // get the player image url *will work on later*
                // const photo = $('.playerphoto > img', html).attr('src')

                resolve({ playerStr, pts, rbs, ast, stl, blk, to })

            })
            .catch(err => {
                // handle err
                reject(err)
                console.log('Error', err)
            })

    })

}

module.exports = avgStats
