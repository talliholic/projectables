const path = require("path");
const express = require("express");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

let phrase;

app.get("", auth, (req, res) => {
  res.render("index", {
    title: "Mr. Perez's Class Projectables",
  });
});
app.get("/pace", auth, (req, res) => {
  res.render("pace");
});
app.get("/menu", auth, (req, res) => {
  res.render("menu");
});
app.get("/text-images", (req, res) => {
  res.render("text-images");
});
app.get("/text-images-language", (req, res) => {
  res.render("text-images-language");
});
app.get("/text-images-math", (req, res) => {
  res.render("text-images-math");
});
app.get("/auth", (req, res) => {
  res.render("auth", {
    title: "Get Authorized",
  });
});
app.post("/phrase", (req, res) => {
  res.cookie("sec_phrase", req.body.phrase, {
    httpOnly: true,
  });
  res.send({ phrase: req.body.phrase });
});

function auth(req, res, next) {
  const secret = req.cookies.sec_phrase;
  if (secret === "healthy") {
    next();
  } else {
    res.redirect("/auth");
  }
}
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
