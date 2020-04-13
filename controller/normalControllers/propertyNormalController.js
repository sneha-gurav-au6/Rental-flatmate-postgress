const Property = require("../../models/property")
const {
    Op
} = require("sequelize");

module.exports = {
    propertyFilters: async (req, res) => {
        const location = req.params.location.toLowerCase();
        const location1 = location.slice(9);
        const type = req.params.type;
        const type2 = type.slice(5);
        const gender = req.params.gender.toLowerCase();
        const gender1 = gender.slice(7);
        const rent = req.params.rent;
        const rent1 = rent.slice(5);
        const rent2 = Number(rent1);
        try {
            const data = await Property.findAll({
                where: {
                    [Op.or]: [{
                            property_type: type2
                        },
                        {
                            property_location: location1
                        },
                        {
                            property_type_gender: gender1
                        },
                        {
                            property_rent: {
                                [Op.lt]: rent2,
                            },
                        },
                    ],
                },
            });
            res.status(200).json(data)
        } catch (err) {
            res.status(500).send("server error");
        }
    },
    getProperty: (req, res) => {
        Property.findAll({
            raw: true
        }).then(function (property) {
            res.send(property)

        }).catch(function (err) {
            console.log(err.message)
        })
    },
    getPropertyDetailsById: async (req, res) => {
        const detail = req.params.property_id;
        console.log(detail)


        const property = [];

        try {
            const propertyDetails = await Property.findByPk(detail)

            const propertys = {
                property_title: propertyDetails.property_title,
                property_img: propertyDetails.property_img,
                property_rent: propertyDetails.property_rent,
                property_deposit: propertyDetails.proprty_deposit,
                property_loction: propertyDetails.property_location,
                property_amenities: propertyDetails.property_amenities,
                propert_possesion: propertyDetails.propert_possesion,
                property_address: propertyDetails.property_address,
                property_area: propertyDetails.property_area,
                property_furnish: propertyDetails.property_furnish,
                "To get details of owner for this property  use  this id": propertyDetails.user,
            };
            property.push(propertys);


            res.status(200).json(property);
        } catch (err) {
            res.status(500).send("server error")
            console.log(err.massage)
        }

    }
}