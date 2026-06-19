require('dotenv').config();
const app  = require('./app.js');
const PORT = process.env.PORT || 8000;

const groq = require("./Config/groq.config.js");


app.listen(PORT , () => {
  console.log(`Server running on http://localhost:${PORT}/`);
})