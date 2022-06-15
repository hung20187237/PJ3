const express = require("express");
const app = express();

const cors = require('cors')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const commentRoute = require('./routes/comment')
const messageRoute = require('./routes/message')
const conversationRoute = require('./routes/conversation')
const friendRequestRoute = require('./routes/friendRequest')
const path = require("path");
let bodyParser = require('body-parser');

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

app.use('/public', express.static('public'));
app.use('/endpoint', REST_API)

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Connected : ' + port)
})

app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Error occured'));
    });
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment",commentRoute);
app.use("/api/message",messageRoute);
app.use("/api/conversation",conversationRoute);
app.use("/api/friendRequest",friendRequestRoute);


app.listen(8800, () => {
  console.log("Backend server is running!");
});