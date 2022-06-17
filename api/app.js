const express = require("express");
const routes = require("./routes/index");
const sequelize = require("./db");
const morgan = require("morgan");
const app = express();

require("./models/Productor");
require("./models/Usuario");
require("./models/Events");
require("./models/Ticked");

app.use(express.json());

app.use(
  // configuracion para morgan
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);
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
