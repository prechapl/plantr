const Sequelize = require('sequelize');
const conn = new Sequelize (process.env.DATABASE_URL);

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
    planted_on: {
        type: Sequelize.DATEONLY,
        validate: {
            isDate: true
        }
    }
});

//prof says a plot a could belongs to gardener, would need to refactor a bit

Plot.belongsTo(Gardener);
Gardener.hasOne(Plot);
Vegetable.belongsToMany(Plot, {through: 'vegetable_plot'});
Plot.belongsToMany(Vegetable, {through: 'vegetable_plot'});
Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'});

module.exports = {
    conn,
    Gardener,
    Plot,
    Vegetable
}