const API = "http://localhost:5000/api/products";
let products = [];
let modal;

document.addEventListener("DOMContentLoaded", () => {
  modal = new bootstrap.Modal(document.getElementById("productModal"));
  document.querySelectorAll("#viewTabs .nav-link").forEach(btn => {
    btn.addEventListener("click", () => switchView(btn.dataset.view, btn));
  });
  document.getElementById("searchInput").addEventListener("input", renderShop);
  document.getElementById("categoryFilter").addEventListener("change", renderShop);
  loadProducts();
});

function switchView(view, btn) {
  document.querySelectorAll("#viewTabs .nav-link").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("shopView").classList.toggle("d-none", view !== "shop");
  document.getElementById("manageView").classList.toggle("d-none", view !== "manage");
  if (view === "manage") renderManageTable();
}

async function loadProducts() {
  try {
    const res = await fetch(API);
    products = await res.json();
    fillCategoryFilter();
    renderShop();
    renderManageTable();
  } catch (err) {
    showToast("Could not reach the server. Is the backend running?");
  }
}

function fillCategoryFilter() {
  const sel = document.getElementById("categoryFilter");
  const cats = ["All", ...new Set(products.map(p => p.category))];
  sel.innerHTML = cats.map(c => `<option value="${c}">${c}</option>`).join("");
}

function renderShop() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  const cat = document.getElementById("categoryFilter").value;
  const grid = document.getElementById("productGrid");
  const filtered = products.filter(p =>
    (cat === "All" || !cat || p.category === cat) &&
    (p.name.toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q))
  );
  grid.innerHTML = filtered.map(p => `
    <div class="col-sm-6 col-lg-4">
      <div class="product-card card">
        <img src="${p.image || "https://via.placeholder.com/400x250?text=Coca-Cola"}" alt="${p.name}">
        <div class="card-body">
          <span class="badge badge-cat mb-2 align-self-start">${p.category}</span>
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text text-muted small flex-grow-1">${p.description || ""}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="price">$${Number(p.price).toFixed(2)}</span>
            <span class="small text-muted">${p.stock > 0 ? p.stock + " in stock" : "Out of stock"}</span>
          </div>
        </div>
      </div>
    </div>
  `).join("") || `<p class="text-muted">No products match.</p>`;
}

function renderManageTable() {
  const tbody = document.getElementById("productTableBody");
  tbody.innerHTML = products.map(p => `
    <tr>
      <td><img src="${p.image}" width="48" height="48" style="object-fit:cover;border-radius:6px"></td>
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>$${Number(p.price).toFixed(2)}</td>
      <td>${p.stock}</td>
      <td>
        <button class="btn btn-sm btn-outline-dark me-1" data-bs-toggle="modal" data-bs-target="#productModal" onclick="openEditForm('${p.id}')">Edit</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct('${p.id}')">Remove</button>
      </td>
    </tr>
  `).join("");
}

function openCreateForm() {
  document.getElementById("modalTitle").textContent = "Add Product";
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
