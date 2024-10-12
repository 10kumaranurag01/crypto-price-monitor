const Crypto = require('../models/cryptoModel');
const { calculateDeviation } = require('../utils/mathUtil');

exports.getCryptoStats = async (req, res) => {
    const { coin } = req.query;

    try {
        const latestData = await Crypto.findOne({ coin }).sort({ fetchedAt: -1 });
        if (!latestData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            '24hChange': latestData.change24h
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCryptoDeviation = async (req, res) => {
    const { coin } = req.query;

    try {
        const dataPoints = await Crypto.find({ coin }).sort({ fetchedAt: -1 }).limit(100);
        if (dataPoints.length === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }
        const prices = dataPoints.map(dp => dp.price);

        const deviation = calculateDeviation(prices);
        res.json({ deviation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
