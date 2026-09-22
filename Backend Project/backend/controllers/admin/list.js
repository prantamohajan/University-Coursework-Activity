const { readAdmins } = require('../../data/adminDb');

// GET /api/admin
function listAdmins(req, res) {
  const admins = readAdmins();
  const safeList = admins.map(a => ({ id: a.id, username: a.username }));
  res.json(safeList);
}

module.exports = listAdmins;
