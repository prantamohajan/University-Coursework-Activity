const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// serve the frontend directly, so the whole project can run from one server
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// API routes
app.use('/api', productRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Khata server চলছে: http://localhost:${PORT}`);
});
