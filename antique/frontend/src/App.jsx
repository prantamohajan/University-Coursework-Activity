import { useEffect, useMemo, useState } from "react";
import { api } from "./api";
import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("shop");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [formTarget, setFormTarget] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2400);
  }

  async function loadProducts() {
    setLoading(true);
    try {
      const data = await api.list();
      setProducts(data);
    } catch (err) {
      showToast(`Could not load the catalog: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category))],
    [products]
  );

  const visible = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [products, category, search]);

  function openCreateForm() {
    setFormTarget(null);
    setFormOpen(true);
  }

  function openEditForm(product) {
    setFormTarget(product);
    setFormOpen(true);
  }

  async function handleSave(form) {
    if (formTarget) {
      const updated = await api.update(formTarget.id, form);
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      showToast("Piece updated");
    } else {
      const created = await api.create(form);
      setProducts((prev) => [...prev, created]);
      showToast("Piece added to the collection");
    }
    setFormOpen(false);
  }

  async function handleDelete(product) {
    if (!confirm(`Remove "${product.name}" from the collection?`)) return;
    try {
      await api.remove(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      showToast("Piece removed");
    } catch (err) {
      showToast(`Could not remove: ${err.message}`);
    }
  }

  return (
    <div className="app">
      <header className="site-header">
        <div className="wordmark">
          Relic <span className="amp">&amp;</span> Rule
        </div>
        <nav className="nav-tabs">
          <button className={view === "shop" ? "active" : ""} onClick={() => setView("shop")}>
            Catalog
          </button>
          <button className={view === "manage" ? "active" : ""} onClick={() => setView("manage")}>
            Manage Collection
          </button>
        </nav>
      </header>

      {view === "shop" ? (
        <>
          <section className="hero">
            <div>
              <h1>
                Objects that <em>outlived</em> their century.
              </h1>
              <p>
                A small, hand-checked catalog of antique pieces — furniture, timepieces
                and curios sourced one estate at a time. Every listing is numbered
                and described exactly as found.
              </p>
            </div>
            <div className="hero-stat">
              <span className="num">{products.length}</span>
              <span className="label">pieces in the collection</span>
            </div>
          </section>

          <div className="filter-bar">
            <input
              type="text"
              placeholder="Search the catalog..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {categories.map((c) => (
              <button
                key={c}
                className={`chip ${category === c ? "active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="empty-state">Loading the catalog...</div>
          ) : visible.length === 0 ? (
            <div className="empty-state">No pieces match that search.</div>
          ) : (
            <div className="catalog">
              {visible.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </>
      ) : (
        <section className="manage-view">
          <div className="manage-header">
            <h2>Manage the collection</h2>
            <button className="btn-primary" onClick={openCreateForm}>
              Add a piece
            </button>
          </div>

          {products.length === 0 ? (
            <div className="empty-state">Nothing in the collection yet. Add the first piece.</div>
          ) : (
            <table className="manage-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Era</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <img className="thumb" src={p.image} alt={p.name} />
                    </td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>{p.era}</td>
                    <td>${Number(p.price).toFixed(0)}</td>
                    <td>{p.stock}</td>
                    <td>
                      <div className="row-actions">
                        <button className="icon-btn" onClick={() => openEditForm(p)}>
                          Edit
                        </button>
                        <button className="icon-btn danger" onClick={() => handleDelete(p)}>
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}

      {formOpen && (
        <ProductForm
          initial={formTarget}
          onSave={handleSave}
          onClose={() => setFormOpen(false)}
        />
      )}

      {toast && <div className="toast">{toast}</div>}

      <footer className="site-footer">Relic &amp; Rule — a small antiques catalog, built for demonstration.</footer>
    </div>
  );
}
