const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const connection = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { empRouter } = require("./routes/emp.route");
const { authentication } = require("./middleware/authentication.middleware");

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running");
});

app.use("", userRouter);
app.use(authentication);
app.use("", empRouter);

(async function(){
try {
  await connection;
  console.log("Connected to DB");
  app.listen(port, async () => {
    console.log(`Server is running at the port: ${port}`);
  });
} catch (error) {
  console.log("Error connecting to server or Database");
  console.log(error);
}
})();

