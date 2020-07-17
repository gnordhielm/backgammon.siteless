const express = require("express");

const app = express();

app.get("/*", (req, res) => {
  res.redirect(301, "https://backgammon.siteless.co");
});

app.listen(process.env.PORT || 3000);
