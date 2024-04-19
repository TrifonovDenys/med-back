import express from "express"
import cors from "cors"

import routerApi from "./api"
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', routerApi)

app.use((_, res, _) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routers: /api/tasks",
    data: "Not found",
  })
})

app.use((err, _, res, _) => {
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message
  })
})