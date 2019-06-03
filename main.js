const app = require('./server/server');
const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT} : http://localhost:1337`);
});
