const express = require('express');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
require('./db/db.js');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


// Routes for users
app.use('/api/customers', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
