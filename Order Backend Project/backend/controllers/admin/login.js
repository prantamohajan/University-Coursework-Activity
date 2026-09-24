const bcrypt = require('bcryptjs');
const { readAdmins } = require('../../data/adminDb');

// POST /api/admin/login
function loginAdmin(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'ইউজারনেম ও পাসওয়ার্ড দিতে হবে' });
  }

  const admins = readAdmins();
  const admin = admins.find(a => a.username.toLowerCase() === username.trim().toLowerCase());

  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ error: 'ইউজারনেম বা পাসওয়ার্ড ভুল' });
  }

  res.json({ id: admin.id, username: admin.username });
}

module.exports = loginAdmin;
