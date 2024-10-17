const jwt = require('jsonwebtoken');

const sign = process.env.JWT_SECRET;

const generate = (data) => jwt.sign(data, sign, { expiresIn: '30d' });

const verify = (token) => jwt.verify(token, sign);

module.exports = { generate, verify };