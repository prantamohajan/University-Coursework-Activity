// সব CRUD ফাইলের জন্য একটাই ভিত্তি — ব্যাকএন্ডের ঠিকানা
const API_BASE = 'http://localhost:4000/api';

// সাধারণ fetch র‍্যাপার, সব জায়গায় একই এরর হ্যান্ডলিং ব্যবহারের জন্য
async function apiRequest(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'সার্ভারে সমস্যা হয়েছে');
  }
  return data;
}
