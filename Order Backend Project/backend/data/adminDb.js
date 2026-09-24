const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'admins.json');

function readAdmins() {
  const raw = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(raw);
}

function writeAdmins(admins) {
  fs.writeFileSync(DB_FILE, JSON.stringify(admins, null, 2), 'utf-8');
}

module.exports = { readAdmins, writeAdmins };
