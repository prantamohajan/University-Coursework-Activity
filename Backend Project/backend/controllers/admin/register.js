const bcrypt = require('bcryptjs');
const { readAdmins, writeAdmins } = require('../../data/adminDb');

// POST /api/admin/register
function registerAdmin(req, res) {
  const { username, password } = req.body;

  if (!username || !username.trim() || !password || !password.trim()) {
    return res.status(400).json({ error: 'ইউজারনেম ও পাসওয়ার্ড আবশ্যক' });
  }

  const admins = readAdmins();

  const already = admins.some(a => a.username.toLowerCase() === username.trim().toLowerCase());
  if (already) {
    return res.status(409).json({ error: 'এই ইউজারনেম আগে থেকেই আছে' });
  }

  const newAdmin = {
    id: 'ADM-' + Date.now().toString().slice(-6),
    username: username.trim(),
    password: bcrypt.hashSync(password, 10) // পাসওয়ার্ড হ্যাশ করে রাখা হয়, প্লেইন টেক্সটে না
  };

  admins.push(newAdmin);
  writeAdmins(admins);

  res.status(201).json({ id: newAdmin.id, username: newAdmin.username });
}

module.exports = registerAdmin;
