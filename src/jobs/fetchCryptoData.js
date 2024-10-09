const cron = require('node-cron');
const axios = require('axios');
const Crypto = require('../models/cryptoModel');
const COINS = ['bitcoin', 'matic-network', 'ethereum'];

const fetchCryptoData = async () => {
    try {
        for (const coin of COINS) {
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
                params: {
                    ids: coin,
                    vs_currencies: 'usd',
                    include_market_cap: true,
                    include_24hr_change: true
                }
            });

            const data = response.data[coin];

            await Crypto.create({
                coin,
                price: data.usd,
                marketCap: data.usd_market_cap,
                change24h: data.usd_24h_change
            });

            console.log(`${coin} data fetched and saved`);
        }
    } catch (error) {
        console.error('Error fetching crypto data:', error.message);
    }
};

cron.schedule('0 */2 * * *', fetchCryptoData); // Runs every 2 hours

module.exports = fetchCryptoData;
