const db = require("../db")
const {
    Sequelize,
    DataTypes
} = require("sequelize")

const Property = db.define("Property", {
    property_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    property_img: {
        type: DataTypes.STRING,
        allowNull: false
    },
    property_rent: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    proprty_deposit: {
        type: DataTypes.STRING,
        allowNull: false
    },
    property_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    property_type_gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    property_amenities: {
        type: DataTypes.STRING,
        allowNull: false
    },
    property_location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    propert_possesion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    property_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    property_area: {
        type: DataTypes.STRING,
        allowNull: false
    },
    property_furnish: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user: {
        type: DataTypes.STRING

    }

})

module.exports = Property