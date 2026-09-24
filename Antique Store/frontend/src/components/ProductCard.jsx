export default function ProductCard({ product, index }) {
  const accession = `No. ${String(index + 1).padStart(3, "0")}`;

  return (
    <div className="product-card">
      <img
        className="product-image"
        src={product.image || "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=800&q=80"}
        alt={product.name}
      />
      <div className="product-body">
        <span className="product-acc">{accession}</span>
        <h3 className="product-name">{product.name}</h3>
        <span className="product-meta">
          {product.category} &middot; {product.era}
        </span>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${Number(product.price).toFixed(0)}</span>
          <span className={`stock-tag ${product.stock === 0 ? "out" : ""}`}>
            {product.stock === 0 ? "Sold" : `${product.stock} in stock`}
          </span>
        </div>
      </div>
    </div>
  );
}
