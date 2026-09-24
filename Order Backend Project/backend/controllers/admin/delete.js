const { readAdmins, writeAdmins } = require('../../data/adminDb');

// DELETE /api/admin/:id
function removeAdmin(req, res) {
  const admins = readAdmins();
  const exists = admins.some(a => a.id === req.params.id);

  if (!exists) {
    return res.status(404).json({ error: 'এডমিন পাওয়া যায়নি' });
  }

  if (admins.length === 1) {
    return res.status(400).json({ error: 'শেষ এডমিন অ্যাকাউন্টটি মুছে ফেলা যাবে না' });
  }

  const remaining = admins.filter(a => a.id !== req.params.id);
  writeAdmins(remaining);

  res.json({ message: 'এডমিন মুছে ফেলা হয়েছে', id: req.params.id });
}

module.exports = removeAdmin;
