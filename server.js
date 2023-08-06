const express = require('express');
const db = require('./config');
const routes = require('./routes');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api/contacts', routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log('Server is listening at port 3000');
  });
});
db.on('error', err => {
  console.log("message: Not found");
  console.log(err)
  console.log('stats: 404')
   process.exit(1)
});

