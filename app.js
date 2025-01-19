const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');

const app = express();
const port = 3000;


app.use(cors({
  origin: 'http://localhost:4200',  
}));
app.use(bodyParser.json());

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
