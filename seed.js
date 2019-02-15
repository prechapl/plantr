const {conn, Plot, Gardener, Vegetable } = require('./models');


conn.sync({force: true})
    .then(() => {
        console.log('connected!')
    })
    .then(() => {
        Vegetable.create({ name: 'eggplant', color: 'purple', planted_on: '2019-02-14'})
        Vegetable.create({ name: 'carrot', color: 'orange', planted_on: '2019-02-14'})
        Gardener.create({ name: 'jeb', age: 100 })
        Gardener.create({ name: 'shogun', age: 50 })
    })
    .catch((err) => console.error(err))
    // .finally(() => conn.close())