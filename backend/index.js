const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// parse options
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Routes

const blogRoutes = require("./src/routes/blog.route");
const commentRoutes = require("./src/routes/comment.route");
const userRoutes = require("./src/routes/auth.user.route");

app.use("/api/auth", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

main()
  .then(() => console.log("Connected to DB."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
