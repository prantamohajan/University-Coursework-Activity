// ---------- READ ----------
let currentProducts = [];

async function fetchProducts() {
  currentProducts = await apiRequest('/products');
  return currentProducts;
}

async function loadAndRenderProducts() {
  try {
    await fetchProducts();
    renderProductTable();
  } catch (err) {
    document.getElementById('tableWrap').innerHTML =
      `<div class="empty"><div class="big">লোড করা যায়নি</div>${escapeHtml(err.message)}</div>`;
  }
}

function renderProductTable() {
  const q = document.getElementById('searchBox').value.trim().toLowerCase();
  const filtered = q
    ? currentProducts.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q))
    : currentProducts;

  document.getElementById('totalCount').textContent = currentProducts.length;

  const wrap = document.getElementById('tableWrap');

  if (currentProducts.length === 0) {
    wrap.innerHTML = `<div class="empty"><div class="big">তালিকা এখনো ফাঁকা</div>উপরের ফর্ম থেকে প্রথম পণ্যটি যোগ করুন</div>`;
    return;
  }
  if (filtered.length === 0) {
    wrap.innerHTML = `<div class="empty"><div class="big">কোনো ফলাফল নেই</div>অন্য কোনো নাম বা ক্যাটাগরি দিয়ে খুঁজে দেখুন</div>`;
    return;
  }

  const rows = filtered.map(p => {
    const low = Number(p.qty) <= 5;
    return `
      <tr class="${low ? 'low' : ''}">
        <td>${escapeHtml(p.name)}</td>
        <td>${p.category ? `<span class="badge">${escapeHtml(p.category)}</span>` : ''}</td>
        <td class="num">${formatMoney(p.price)}</td>
        <td class="num qty">${p.qty}</td>
        <td>
          <div class="row-actions">
            <button class="icon-btn" onclick="openEdit('${p.id}')">হালনাগাদ</button>
            <button class="icon-btn danger" onclick="removeProduct('${p.id}')">মুছুন</button>
          </div>
        </td>
      </tr>`;
  }).join('');

  wrap.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>নাম</th>
          <th>ক্যাটাগরি</th>
          <th class="num">দাম</th>
          <th class="num">পরিমাণ</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function formatMoney(n) {
  return '৳' + Number(n).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}
