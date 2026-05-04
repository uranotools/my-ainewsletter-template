import fs from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import path from 'path';

// Load variables from .env
dotenv.config();

const pin = process.env.VITE_EDITOR_PIN || '1234';

// Hash the pin using SHA-256
const hash = crypto.createHash('sha256').update(pin).digest('hex');

const configData = {
  hashedPin: hash
};

// Write to public/config.json
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'config.json'), JSON.stringify(configData, null, 2));

console.log('✅ Security: Editor PIN has been encrypted and saved to public/config.json');
