const crypto = require("crypto");

// generates random data
exports.generateRandomByte = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(30, (err, buff) => {
            if (err) reject(err);
            const buffString = buff.toString("hex");

            resolve(buffString);
        });
    });
};
