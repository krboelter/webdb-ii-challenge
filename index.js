const express = require("express")
const cars = require("./utils/cars")

const server = express()
const host = process.env.HOST || "localhost"
const port = process.env.PORT || 5000

server.use(express.json())

server.get("/api/cars", (req, res) => {
    cars.read()
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(err => {
            res.status(500).json({ error: "Cars could not be retrieved." })
        })
})

server.post("/api/cars", (req, res) => {
    const newCar = {
        vin: req.body.vin,
        make: req.body.make,
        model: req.body.model,
        mileage: req.body.mileage,
        transmissionType: req.body.transmissionType || null,
        titleStatus: req.body.transmissionType || null
    }
    cars.create(newCar)
        .then (newCar => {
            res.status(201).json({ message: "New car has been created." })
        })
        .catch(err => {
            res.status(500).json({ error: "Could not post the new car." })
        })
})

server.listen(port, host, () => {
    console.log(`\nRunning on http://${host}:${port}\n`)
})