const NBA = require('nba')

const getPlayerStats = async (messageText) => {
    try {
        const playerStr = messageText.slice(7)
        const playerFind = await NBA.findPlayer(playerStr)
        const playerStats = await NBA.stats.playerSplits({
            PlayerID: playerFind.playerId
        })

        return {
            player: playerFind,
            splits: playerStats.overallPlayerDashboard[0]
        }

    } catch (err) {
        console.log('err', err)
    }


}

module.exports = getPlayerStats
