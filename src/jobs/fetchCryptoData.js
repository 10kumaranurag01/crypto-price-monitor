const cron = require('node-cron');
const axios = require('axios');
const Crypto = require('../models/cryptoModel');
const COINS = ['bitcoin', 'matic-network', 'ethereum'];

const fetchCryptoData = async () => {
    try {
        // Prepare the request parameters
        const ids = COINS.join(','); // Join coin IDs for a single API call
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
            params: {
                ids,
                vs_currencies: 'usd',
                include_market_cap: true,
                include_24hr_change: true
            }
        });

        // Prepare an array of promises to save data to the database
        const savePromises = COINS.map(async (coin) => {
            const data = response.data[coin];
            if (data) {
                return Crypto.create({
                    coin,
                    price: data.usd,
                    marketCap: data.usd_market_cap,
                    change24h: data.usd_24h_change
                });
            } else {
                console.error(`No data found for ${coin}`);
            }
        });

        // Execute all save operations concurrently
        await Promise.all(savePromises);

        // Log success message (conditionally based on environment)
        if (process.env.NODE_ENV !== 'production') {
            console.log(`${COINS.join(', ')} data fetched and saved`);
        }
    } catch (error) {
        console.error('Error fetching crypto data:', error.message);
    }
};

// Schedule the task to run every 2 hours
cron.schedule('0 */2 * * *', fetchCryptoData);

module.exports = fetchCryptoData;
