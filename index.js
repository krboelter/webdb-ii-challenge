const express = require("express")
const db = require("./utils/db")

const server = express()
const host = process.env.HOST || "localhost"
const port = process.env.PORT || 5000

server.use(express.json())

server.get("/api/cars", async (req, res, next) => {
    try {
        const cars = await db("cars").select()
        res.json(cars)
    } catch (err) {
        next(err)
    }
})

server.post("/api/cars", async (req, res, next) => {
    try {
        const ids = await db("cars").insert(req.body)
        const newPost = await db("cars").where({ id: ids[0] }).first()
        
        res.status(201).json({ message: "New car has been created!" })
    } catch(err) {
        res.status(400).json({ message: "Could not create your car." })
    }
})

server.listen(port, host, () => {
    console.log(`\nRunning on http://${host}:${port}\n`)
})