const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const AES_SECRET_KEY = process.env.AES_SECRET_KEY || 'default-secret-key-32-chars-long';

// Use scrypt to derive a 32-byte key from the secret key
const key = crypto.scryptSync(AES_SECRET_KEY, 'salt', 32);
console.log("ENCRYPTION KEY DERIVED. LENGTH:", key.length);

// Encryption
const encrypt = (text) => {
    if (!text) return text;
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
};

// Decryption
const decrypt = (text) => {
    if (!text || !text.includes(':')) return text;
    const [ivHex, encryptedText] = text.split(':');
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports = { encrypt, decrypt };
