const knex = require("knex")
const config = require("../knexfile")

const db = knex(config.development)

module.exports = {
    read,
    create
}

function read() {
    return db("cars")
}

function create(car) {
    return db("cars")
        .insert(car)
        .then(ids => ({ id: ids[0] }))
}
