import express from "express";
import path from "path";
import open from "open";
import webpack from "webpack";
import config from "../webpack.config.dev";

/* eslint-disable */
/* prettier-ignore */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  })
);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.get("/users", function (req, res) {
  require.json([
    { id: 1, firstName: "Bob", lastName: "Johns", email: "wow1@wow.com" },
    { id: 2, firstName: "david", lastName: "Johns", email: "wow2@wow.com" },
    { id: 3, firstName: "Bobby", lastName: "Johnson", email: "wow@3wow.com" },
  ]);
});

app.listen(port, function (err) {
  if (err) {
    console.log(err); // eslint-disable-line no-console
  } else {
    open("http://localhost:" + port);
  }
});
