const express = require("express");

const app = express();

console.log("Server running");

app.use("/", (req, res, next) => {
  console.log("This always runs!");
  next();
});

// prettier-ignore
app.use("/data", (req, res, next) => {
  console.log("Sending JSON!");
  res.send({"id": "a1"});
});

app.use("/", (req, res, next) => {
  console.log("In another middleware!");
  res.send(
    "<h3 style='max-width: 300px; font-family: Helvetica'>Jeśli chcecie śledzić rozwój mojej apki, zapraszam na moją nową specjalną stronę www </h3><img style='max-width: 300px' src='https://thevinylfactory.com/wp-content/uploads/2020/08/Haruomi-Hosono-Takahiko-Ishikawa-and-Masataka-Matsutoy-the-aegean-sea-riessue-vinyl.jpg'>"
  );
});

app.listen(3000);
