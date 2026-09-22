import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "data", "products.json");

const app = express();
app.use(cors());
app.use(express.json());

async function readProducts() {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

async function writeProducts(products) {
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2));
}

function validateProduct(body, { partial = false } = {}) {
  const errors = [];
  const fields = ["name", "category", "price", "stock", "description", "image"];

  for (const field of ["name", "category", "price"]) {
    if (!partial && (body[field] === undefined || body[field] === "")) {
      errors.push(`"${field}" is required`);
    }
  }
  if (body.price !== undefined && (isNaN(Number(body.price)) || Number(body.price) < 0)) {
    errors.push('"price" must be a non-negative number');
  }
  if (body.stock !== undefined && (isNaN(Number(body.stock)) || Number(body.stock) < 0)) {
    errors.push('"stock" must be a non-negative number');
  }

  const clean = {};
  for (const field of fields) {
    if (body[field] !== undefined) clean[field] = body[field];
  }
  if (clean.price !== undefined) clean.price = Number(clean.price);
  if (clean.stock !== undefined) clean.stock = Number(clean.stock);

  return { errors, clean };
}

// GET /api/products - list all, with optional search & category filter
app.get("/api/products", async (req, res) => {
  try {
    const products = await readProducts();
    const { search, category } = req.query;
    let result = products;

    if (category) {
      result = result.filter(
        (p) => p.category.toLowerCase() === String(category).toLowerCase()
      );
    }
    if (search) {
      const q = String(search).toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Could not load products" });
  }
});

// GET /api/products/:id - single product
app.get("/api/products/:id", async (req, res) => {
  try {
    const products = await readProducts();
    const product = products.find((p) => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Could not load product" });
  }
});

// POST /api/products - create
app.post("/api/products", async (req, res) => {
  try {
    const { errors, clean } = validateProduct(req.body);
    if (errors.length) return res.status(400).json({ errors });

    const products = await readProducts();
    const newProduct = {
      id: nanoid(8),
      name: clean.name,
      category: clean.category,
      price: clean.price,
      stock: clean.stock ?? 1,
      description: clean.description || "",
      image: clean.image || "",
    };

    products.push(newProduct);
    await writeProducts(products);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Could not create product" });
  }
});


// PUT /api/products/:id - full update
app.put("/api/products/:id", async (req, res) => {
  try {
    const { errors, clean } = validateProduct(req.body);
    if (errors.length) return res.status(400).json({ errors });

    const products = await readProducts();
    const index = products.findIndex((p) => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Product not found" });

    products[index] = { ...products[index], ...clean };
    await writeProducts(products);
    res.json(products[index]);
  } catch (err) {
    res.status(500).json({ error: "Could not update product" });
  }
});

// PATCH /api/products/:id - partial update
app.patch("/api/products/:id", async (req, res) => {
  try {
    const { errors, clean } = validateProduct(req.body, { partial: true });
    if (errors.length) return res.status(400).json({ errors });

    const products = await readProducts();
    const index = products.findIndex((p) => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Product not found" });

    products[index] = { ...products[index], ...clean };
    await writeProducts(products);
    res.json(products[index]);
  } catch (err) {
    res.status(500).json({ error: "Could not update product" });
  }
});

// DELETE /api/products/:id - remove
app.delete("/api/products/:id", async (req, res) => {
  try {
    const products = await readProducts();
    const index = products.findIndex((p) => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "Product not found" });

    const [removed] = products.splice(index, 1);
    await writeProducts(products);
    res.json({ message: "Product removed", product: removed });
  } catch (err) {
    res.status(500).json({ error: "Could not delete product" });
  }
});

app.get("/", (req, res) => {
  res.send("Coke Store API is running. Try GET /api/products");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Coke Store API listening on http://localhost:${PORT}`);
});
