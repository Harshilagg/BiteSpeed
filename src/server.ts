import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import identifyRoutes from "./routes/identify.routes"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/identify", identifyRoutes)

app.get("/", (req, res) => {
 res.send("Identity Reconciliation API")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`)
})