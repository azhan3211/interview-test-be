const crypto = require('crypto');

// Generate a random 32-byte hex string
const secret = crypto.randomBytes(32).toString('hex');
console.log(`Your JWT secret: ${secret}`);