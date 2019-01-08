const schedule = require('node-schedule')
const tweet = require('./twitter')

const rule = new schedule.RecurrenceRule()

// run at 9am EST
rule.hour = 8
rule.minute = 0

const j = schedule.scheduleJob(rule, function () {
    console.log('Checking for new twitter LOTN')
    tweet()
})
