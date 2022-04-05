const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require("cors")
app.use(cors());
// app.use(function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept,Authorization,Origin");
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     next();
//   });`enter code here`

// console.log('lama')

// app.use('/', (req, res) => {
//   console.log('this is main url')
//   res.send("this is main")
// })
dotenv.config();
// them dong nay thi moi dung req.body duoc
app.use(express.json());
// app.use("/images", express.static(path.join(__dirname, "/images")));
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
  })
  .then(console.log("Connected to MongoDB successfully 😍"))
  .catch((err) => console.log(err));

  // upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
// app.use('/', (req, res) => {
//   console.log('this is main url')
//   res.send("this is main")
// })
// config deploy
app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

//  end config deploy
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is running.");
});
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});