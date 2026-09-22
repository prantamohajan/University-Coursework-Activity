import { useState } from "react";

const emptyForm = {
  name: "",
  category: "",
  era: "",
  price: "",
  stock: "",
  description: "",
  image: "",
};

export default function ProductForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial ? { ...emptyForm, ...initial } : emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.category || !form.price) {
      setError("Name, category and price are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await onSave(form);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h2>{initial ? "Edit piece" : "Add a piece to the collection"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field full">
              <label>Name</label>
              <input value={form.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div className="form-field">
              <label>Category</label>
              <input value={form.category} onChange={(e) => update("category", e.target.value)} />
            </div>
            <div className="form-field">
              <label>Era</label>
              <input value={form.era} onChange={(e) => update("era", e.target.value)} placeholder="Circa 1900" />
            </div>
            <div className="form-field">
              <label>Price (USD)</label>
              <input type="number" min="0" value={form.price} onChange={(e) => update("price", e.target.value)} />
            </div>
            <div className="form-field">
              <label>Stock</label>
              <input type="number" min="0" value={form.stock} onChange={(e) => update("stock", e.target.value)} />
            </div>
            <div className="form-field full">
              <label>Image URL</label>
              <input value={form.image} onChange={(e) => update("image", e.target.value)} placeholder="https://..." />
            </div>
            <div className="form-field full">
              <label>Description</label>
              <textarea value={form.description} onChange={(e) => update("description", e.target.value)} />
            </div>
          </div>
          {error && <div className="form-error">{error}</div>}
          <div className="modal-actions">
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving..." : initial ? "Save changes" : "Add piece"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
