const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const Gardener = conn.define('gardener', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: Sequelize.INTEGER
});
const Plot = conn.define('plot', {
    size: Sequelize.STRING,
    shaded: Sequelize.BOOLEAN
});
const Vegetable = conn.define('vegetable', {
    name: Sequelize.STRING,
    color: Sequelize.STRING,
    plantedOn: {
        type: Sequelize.DATEONLY,
        validate: {
            isDate: true
        }
    }
});


//prof says a plot a could belongs to gardener, would need to refactor a bit

Plot.belongsTo(Gardener);
Gardener.hasOne(Plot);

//many to many ; creates a new join table with 'through' option
Vegetable.belongsToMany(Plot, {through: 'vegetable_plot'});
Plot.belongsToMany(Vegetable, {through: 'vegetable_plot'});

//this puts foriegn key on column on Gardeners table
Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'});

// this is how you access the join table
const PlotVegetable = conn.model('vegetable_plot')

module.exports = {
    conn,
    Gardener,
    Plot,
    Vegetable,
    PlotVegetable
}
