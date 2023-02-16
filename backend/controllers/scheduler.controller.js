const cron = require('node-cron')
const moment = require('moment')
const { fetchData, parseData } = require('./pricezag.controller')
const { createOffer } = require('./supabase.controller')

const launchCron = async () => {
    cron.schedule('0 8 * * *', async () => {
    // cron.schedule('*/10 * * * * *', async () => {
        try {
            console.log('📥 Fetching')
            const data = await fetchData();
            console.log('🔨 Parsing')
            const offers = await parseData(data);
            console.log('💾 Upserting')
            await createOffer(offers);
            console.log(`✅ Success on the ${moment().format('YYYY-MM-DD')}`)

        } catch (error) {
            console.log(`❌ Problem occurs on the ${moment().format('YYYY-MM-DD')}`, error)
        }
    })

}

module.exports = {
    launchCron,
}