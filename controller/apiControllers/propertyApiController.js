const Property = require("../../models/property")

module.exports = {
    updatePropertyByID: async (req, res) => {
        const user = req.user;

        const property_id = req.params.property_id;

        try {
            const property = await Property.update({
                id: property_id,
                property_title: req.body.property_title,
                property_img: req.body.property_img,
                property_rent: req.body.property_rent,
                proprty_deposit: req.body.proprty_deposit,
                property_type: req.body.property_type,
                property_type_gender: req.body.property_type_gender,
                property_amenities: req.body.property_amenities,
                property_location: req.body.property_location,
                propert_possesion: req.body.propert_possesion,
                property_address: req.body.property_address,
                property_area: req.body.property_area,
                property_furnish: req.body.property_furnish,
            }, {
                returning: true,
                where: {
                    user: user.id,
                    id: property_id
                }
            });
            res.status(200).json({
                massage: "Property updated successfully", data: property });
        } catch (err) {
            res.status(403).send("You are not allowed to delete this property");
            console.log(err.massage);
        }
    },
    deletePropertyById: async (req, res) => {
        const property_id = req.params.property_id;
        const user = req.user;
        const prop = await Property.findOne({
            where: {
                id: property_id,
            },
        });
        try {
            const data = await prop.destroy();

            res.status(200).send(
                "Property Deleted Succesfully",
            );
        } catch (err) {
            console.log(err.massage);
            res.status(500).send("server error");
        }
    }
}