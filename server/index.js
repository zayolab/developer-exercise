const express = require("express")
const cors = require("cors")
const revenueRoutes = require("./routes/revenueRoutes")
const expenseRoutes = require("./routes/expenseRoutes")
require("./database")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/revenue", revenueRoutes)
app.use("/api/expenses", expenseRoutes)

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Express server running on port ${port}`)
})
