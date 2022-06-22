const express = require("express");
const routes = require("./routes/index");
const sequelize = require("./db");
const morgan = require("morgan");
const app = express();

require("./models/Producer");
require("./models/User");
require("./models/Events");
require("./models/Ticket");
require("./models/Genre");

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/api", routes);

async function main() {
  try {
    await sequelize.sync({ force: true });
    console.log("Conection DB succesful");
    app.listen(3001, () => {
      console.log("App listen on port 3001");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
