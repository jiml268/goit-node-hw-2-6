const db = require('./config');
const app = require('./app');
const PORT = process.env.PORT || 3000;

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

