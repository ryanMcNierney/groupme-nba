const Twitter = require('twitter')
const Bot = require('./bot')
const dateFormat = require('dateformat')

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const path = 'search/tweets'
const search = '#SAPStatLineOfTheNight from:nbastats'

const tweet = () => {
    client.get(path, { q: search }, (err, tweets, res) => {
        if (err) console.log(err)
        // returns obj - statuses: [{},{},{}]
        // each obj in the array is a tweet

        const createdAt = tweets.statuses[0].created_at.slice(0, 10)
        const text = tweets.statuses[0].text
        const statImg = tweets.statuses[0].entities.media[0].media_url

        // clean the text
        const cleanText = text.substring(0, text.indexOf('#SAPStatLineOfTheNight'))

        // update img to https
        const cleanImg = 'https' + statImg.slice(4)

        // check the date. if createdAt = todays date send message
        const today = dateFormat().slice(0, 10)
        if (today === createdAt) {
            // get yesterday date
            const p = new Date()
            const prev = p.setDate(p.getDate() - 1)
            const prevDay = dateFormat(prev).slice(0, 10)

            // build Line of the night post
            const lotn = `***** Stat Line Of The Night *****\n********** ${prevDay} **********\n${cleanText}`

            // post message
            Bot.sendMessage(lotn)

            // post image on delay
            setTimeout(() => {
                Bot.sendMessage(cleanImg)
            }, 2000)
        }
    })
}

module.exports = tweet
