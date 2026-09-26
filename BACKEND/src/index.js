import express from "express"
import "dotenv/config"

let app = express();

let PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`)
})