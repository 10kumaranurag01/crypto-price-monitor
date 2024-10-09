exports.calculateDeviation = (numbers) => {
    const n = numbers.length;
    const mean = numbers.reduce((a, b) => a + b, 0) / n;
    const variance = numbers.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n;
    return Math.sqrt(variance);
};
