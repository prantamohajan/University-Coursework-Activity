const API = "http://localhost:5001/api/products";
let products = [];
let activeCategory = "All";
let modal;

document.addEventListener("DOMContentLoaded", () => {
  modal = new bootstrap.Modal(document.getElementById("productModal"));
  document.querySelectorAll("#viewTabs .side-link").forEach(btn => {
    btn.addEventListener("click", () => switchView(btn.dataset.view, btn));
  });
  document.getElementById("searchInput").addEventListener("input", renderShop);
  loadProducts();
});

function switchView(view, btn) {
  document.querySelectorAll("#viewTabs .side-link").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("shopView").classList.toggle("d-none", view !== "shop");
  document.getElementById("manageView").classList.toggle("d-none", view !== "manage");
  if (view === "manage") renderManageGrid();
}

async function loadProducts() {
  try {
    const res = await fetch(API);
    products = await res.json();
    renderCategoryChips();
    renderShop();
    renderManageGrid();
  } catch (err) {
    showToast("Could not reach the server. Is the backend running?");
  }
}

function renderCategoryChips() {
  const wrap = document.getElementById("categoryChips");
  const cats = ["All", ...new Set(products.map(p => p.category))];
  wrap.innerHTML = cats.map(c =>
    `<button class="chip-btn ${c === activeCategory ? "active" : ""}" onclick="setCategory('${c}')">${c}</button>`
  ).join("");
}

function setCategory(cat) {
  activeCategory = cat;
  renderCategoryChips();
  renderShop();
}

function renderShop() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  const grid = document.getElementById("productGrid");
  const filtered = products.filter(p =>
    (activeCategory === "All" || p.category === activeCategory) &&
    (p.name.toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q))
  );
  grid.innerHTML = filtered.map(p => `
    <div class="product-row">
      <img src="${p.image || "https://via.placeholder.com/150?text=AP"}" alt="${p.name}">
      <div class="info">
        <span class="cat-tag">${p.category}</span>
        <h5>${p.name}</h5>
        <p>${p.description || ""}</p>
      </div>
      <div class="right-col">
        <span class="price">$${Number(p.price).toFixed(2)}</span>
        <span class="stock">${p.stock > 0 ? p.stock + " in stock" : "Out of stock"}</span>
      </div>
    </div>
  `).join("") || `<p class="text-muted">No products match.</p>`;
}

function renderManageGrid() {
  const grid = document.getElementById("manageGrid");
  grid.innerHTML = products.map(p => `
    <div class="manage-card">
      <img src="${p.image}" alt="${p.name}">
      <h6>${p.name}</h6>
      <div class="sub">${p.category} &middot; $${Number(p.price).toFixed(2)} &middot; ${p.stock} in stock</div>
      <div class="card-actions">
        <button class="btn btn-sm btn-outline-dark" data-bs-toggle="modal" data-bs-target="#productModal" onclick="openEditForm('${p.id}')">Edit</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct('${p.id}')">Remove</button>
      </div>
    </div>
  `).join("");
}

function openCreateForm() {
  document.getElementById("modalTitle").textContent = "New Product";
  document.getElementById("productForm").reset();
  document.getElementById("productId").value = "";
  document.getElementById("formError").textContent = "";
}

function openEditForm(id) {
  const p = products.find(x => x.id === id);
  document.getElementById("modalTitle").textContent = "Edit Product";
  document.getElementById("productId").value = p.id;
  document.getElementById("fName").value = p.name;
  document.getElementById("fCategory").value = p.category;
  document.getElementById("fPrice").value = p.price;
  document.getElementById("fStock").value = p.stock;
  document.getElementById("fImage").value = p.image;
  document.getElementById("fDescription").value = p.description;
  document.getElementById("formError").textContent = "";
}

async function saveProduct() {
  const id = document.getElementById("productId").value;
  const body = {
    name: document.getElementById("fName").value,
    category: document.getElementById("fCategory").value,
    price: document.getElementById("fPrice").value,
    stock: document.getElementById("fStock").value || 0,
    image: document.getElementById("fImage").value,
    description: document.getElementById("fDescription").value,
  };
  if (!body.name || !body.category || !body.price) {
    document.getElementById("formError").textContent = "Name, category and price are required.";
    return;
  }
  try {
    const res = await fetch(id ? `${API}/${id}` : API, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error((await res.json()).error || "Save failed");
    modal.hide();
    showToast(id ? "Product updated" : "Product added");
    await loadProducts();
  } catch (err) {
    document.getElementById("formError").textContent = err.message;
  }
}

async function deleteProduct(id) {
  if (!confirm("Remove this product?")) return;
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    showToast("Product removed");
    await loadProducts();
  } catch (err) {
    showToast("Could not remove product");
  }
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.style.display = "block";
  setTimeout(() => (t.style.display = "none"), 2200);
}
