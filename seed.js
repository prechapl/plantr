const {conn, Plot, Gardener, Vegetable, PlotVegetable } = require('./models');


conn.sync({force: true})
    .then(() => { console.log('connected!')})
    .then(() => {
        return Promise.all([
            Vegetable.create({ name: 'eggplant', color: 'purple', plantedOn: '2019-02-14'}),
            Vegetable.create({ name: 'carrot', color: 'orange', plantedOn: '2019-02-14'})
            ])
            .then((veg) => {
                Gardener.create({ name: 'jeb', age: 100, favoriteVegetableId: veg.id})
                    .then((owner) => {
                        return Plot.create({ size: '1 acre', shaded: true, gardenerId: owner.id })
                        })
                        .then((plot) => {
                            return PlotVegetable.create({
                                vegetableId: veg.id,
                                plotId: plot.id
                            })
                        })
                })

    })

    .catch((err) => console.error(err))

