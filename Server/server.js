const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./DB/connectDB")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const userRouter = require("./route/userRoute")
dotenv.config()

const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL

connectDB(MONGODB_URL)
const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api",userRouter);
 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

app.listen(PORT,()=> {
    console.log(`Server running on ${PORT}`);
})  

