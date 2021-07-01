const result = process.argv.reduce((sum, now) => {
    const number = Number(now);
    if (isNaN(number)) {
        return sum;
    } else {
        return sum + number;
    }
}, 0);
console.log(result);