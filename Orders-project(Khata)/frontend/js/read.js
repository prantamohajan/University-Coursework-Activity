// ---------- READ ----------
let currentOrders = [];
let activeFilter = 'সব';

async function fetchOrders() {
  currentOrders = await apiRequest('/orders');
  return currentOrders;
}

async function loadAndRenderOrders() {
  try {
    await fetchOrders();
    renderOrders();
  } catch (err) {
    document.getElementById('orderGrid').innerHTML =
      `<div class="empty"><div class="big">লোড করা যায়নি</div>${escapeHtml(err.message)}</div>`;
  }
}

function renderOrders() {
  const filtered = activeFilter === 'সব'
    ? currentOrders
    : currentOrders.filter(o => o.status === activeFilter);

  document.getElementById('totalOrders').textContent = currentOrders.length;
  const revenue = currentOrders
    .filter(o => o.status !== 'বাতিল')
    .reduce((sum, o) => sum + Number(o.price), 0);
  document.getElementById('totalRevenue').textContent = formatMoney(revenue);

  const grid = document.getElementById('orderGrid');

  if (currentOrders.length === 0) {
    grid.innerHTML = `<div class="empty"><div class="big">এখনো কোনো অর্ডার নেই</div>উপরের ফর্ম থেকে প্রথম অর্ডারটি নিন</div>`;
    return;
  }
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty"><div class="big">এই অবস্থায় কোনো অর্ডার নেই</div>অন্য ফিল্টার বেছে দেখুন</div>`;
    return;
  }

  grid.innerHTML = filtered.map(o => `
    <div class="order-card">
      <div class="oc-top">
        <div>
          <div class="oc-id">${o.id}</div>
          <div class="oc-customer">${escapeHtml(o.customer)}</div>
        </div>
        <span class="status-badge status-${o.status}">${o.status}</span>
      </div>
      <div class="oc-item">${escapeHtml(o.item)}</div>
      <div class="oc-meta">
        <span>পরিমাণ: ${o.quantity}</span>
        <span class="price">${formatMoney(o.price)}</span>
      </div>
      <div class="oc-actions">
        <button class="icon-btn" onclick="openEdit('${o.id}')">হালনাগাদ</button>
        <button class="icon-btn danger" onclick="removeOrder('${o.id}')">বাতিল</button>
      </div>
    </div>
  `).join('');
}

function formatMoney(n) {
  return '৳' + Number(n).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}
