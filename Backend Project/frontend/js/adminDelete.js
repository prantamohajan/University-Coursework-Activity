// ---------- ADMIN DELETE ----------
async function removeAdmin(id) {
  try {
    await apiRequest(`/admin/${id}`, { method: 'DELETE' });
    showToast('এডমিন সরিয়ে দেওয়া হয়েছে');
    await loadAndRenderAdmins();
  } catch (err) {
    showToast(err.message);
  }
}
