const Sequelize = require("sequelize")
const {
    POSTGRESS_URI,
    POSTGRESS_PASSWORD
} = process.env

const sequelize = new Sequelize(POSTGRESS_URI.replace("<password>", POSTGRESS_PASSWORD));
sequelize.sync();
sequelize.authenticate().then(() => console.log("postgress connected")).catch((err) => {
    console.log(err.message)
})
module.exports = sequelize;