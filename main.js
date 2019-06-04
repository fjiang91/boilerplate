const app = require('./server/server');
const { db } = require('./server/models/db');
const PORT = process.env.PORT || 1337;

db.sync()
  .then( () => {
    console.log('DB Synced');
    app.listen(PORT, () => {
      console.log(`Listening on PORT: ${PORT} : http://localhost:1337`);
  })
});
