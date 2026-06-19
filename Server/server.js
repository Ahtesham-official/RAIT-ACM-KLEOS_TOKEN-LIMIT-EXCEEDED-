require("dotenv").config();

const app = require("./app.js");
const connectDB = require("./DB/db");

const PORT = process.env.PORT || 8000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});