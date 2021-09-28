const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose  = require("mongoose")

// import semua routes yg dibuat
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const postRoute = require("./routes/post")
const CatRoute = require("./routes/category")

const PORT = 5000

dotenv.config()

app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/welcome", (req,res)=>{
    console.log("blalala");
    res.json({
        message: "Halo"
    })
})

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/categories", CatRoute)

app.listen(PORT, ()=> {
    console.log(`app is running on localhost:${PORT}`);
})