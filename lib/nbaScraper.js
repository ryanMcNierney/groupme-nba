const rp = require('request-promise')
const $ = require('cheerio')
const playerIds = require('./playerIds')
// const axios = require('axios')

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
                const fgP = avgSeasonStats['8'].children[0].data
                const ftP = avgSeasonStats['11'].children[0].data
                const threeM = avgSeasonStats['12'].children[0].data
                const gm = avgSeasonStats['0'].children[0].data

                const threeP = Number(threeM) / Number(gm)
                const threePClean = threeP.toFixed(1)

                // get the player image url *will work on later*
                // const photo = $('.playerphoto > img', html).attr('src')

                const statsStr = `fgp: ${fgP} | ftp: ${ftP} | 3pt: ${threePClean} | pts: ${pts}\nrbs: ${rbs} | ast: ${ast} | st: ${stl} | blk: ${blk}| to: ${to}`

                resolve(`${playerStr}: Per Game Avg.\n${statsStr}`)

            })
            .catch(err => {
                // handle err
                reject(err)
                console.log('Error', err)
            })

    })

}

const getLogs = (messageText) => {

    return new Promise((resolve, reject) => {
        // clean the player name
        const playerStr = messageText.slice(5)

        // get the id from playerIds.js
        const id = playerIds[playerStr]

        // build the url the scrape
        const url = `http://rotoworld.com/player/nba/${id}`

        // make the call to rotoworld
        rp(url)
            .then(html => {
                // success!

                // scrape the stats table
                const logTable = $('#cp1_pnlStatControls > table > tbody > tr:nth-of-type(4) > td', html)

                // get the stats
                const date = logTable['0'].children[0].data
                const opp = logTable['1'].children[0].data
                const fgm = logTable['4'].children[0].data
                const fga = logTable['5'].children[0].data
                const fgPer = logTable['6'].children[0].data
                const threeM = logTable['7'].children[0].data
                const ftm = logTable['10'].children[0].data
                const fta = logTable['11'].children[0].data
                const ftPer = logTable['12'].children[0].data
                const rbs = logTable['15'].children[0].data
                const ast = logTable['16'].children[0].data
                const to = logTable['17'].children[0].data
                const stl = logTable['18'].children[0].data
                const blk = logTable['19'].children[0].data
                const pts = logTable['21'].children[0].data

                const gameLog = `fgp: ${fgPer} | ftp: ${ftPer} | 3pt: ${threeM} | pts: ${pts}\nrbs: ${rbs} | ast: ${ast} | st: ${stl} | blk: ${blk}| to: ${to}`

                const gameLogStr = `${playerStr} - ${date} - ${opp}\n${gameLog}`

                resolve(gameLogStr)

            })
            .catch(err => {
                // handle err
                reject(err)
                console.log('Error', err)
            })

    })

}

module.exports = { avgStats, getLogs }
