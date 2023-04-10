const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
//The process runs before the server once the node js is set up the process also starts running
//console.log(process.env);

const app = require("./app");
//console.log(app.get("env"));

mongoose
  .connect(process.env.CONN_STR, { useNewUrlParser: true })
  .then((conn) => {
    //console.log(conn);
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(`Database Connection Error ${err}`);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is up and running");
});
