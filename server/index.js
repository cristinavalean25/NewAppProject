const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

let products = [];
let lastProductId = 0;

app.get('/products', (_req, res) => {
  res.json(products);
});

app.get('/products/femei', (_req, res) => {
  const femaleProducts = products.filter(product => product.gender === 'femei');
  res.json(femaleProducts);
});

app.get('/products/barbati', (_req, res) => {
  const maleProducts = products.filter(product => product.gender === 'barbati');
  res.json(maleProducts);
});

app.post('/products', express.json(), (req, res) => {
  const newProduct = req.body;
  newProduct.id = lastProductId;
  products.push(newProduct);
  lastProductId++;
  saveProductsToFile();
  res.status(201).json(newProduct);
});

app.put('/products/:id', express.json(), (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;

  const index = products.findIndex(product => product.id === productId);
  if (index !== -1) {
    products[index] = {...products[index], ...updatedProduct};
    res.json(products[index]);
  } else {
    res.status(404).json({message: 'Produsul nu a fost gasit.'});
  }
});

app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex(product => product.id === productId);
  console.log('Deleting product with ID:', productId);
  if (index !== -1) {
    const deletedProduct = products.splice(index, 1)[0];
    saveProductsToFile();
    res.json(deletedProduct);
  } else {
    res.status(404).json({message: 'Produsul nu a fost gasit.'});
  }
});

app.get('/category', (req, res) => {
  const categories = [...new Set(products.map(product => product.category))];
  res.json(categories);
});

function loadProductsFromFile() {
  if (fs.existsSync('products.json')) {
    const data = fs.readFileSync('products.json', 'utf8');
    const parsedData = JSON.parse(data);
    products = parsedData.products;
    lastProductId = parsedData.lastProductId;
  }
}

function saveProductsToFile() {
  const dataToSave = {products, lastProductId};
  fs.writeFileSync('products.json', JSON.stringify(dataToSave));
}

loadProductsFromFile();

app.get('/', (req, res) => {
  res.send('Bun venit la API-ul meu!');
});

app.listen(port, () => {
  console.log(`Serverul rulează la adresa http://localhost:${port}`);
});
