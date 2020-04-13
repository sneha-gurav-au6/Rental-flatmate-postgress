const {
    Router
} = require("express")

const router = Router()
const Property = require("../models/property")
const User = require("../models/user")
const auth = require("../middleware/auth")

const {
    register,
    login,
    logout,
    addProperty,
    userMyFav,
    userEmailDetails
} = require("../controller/apiControllers/userApiController")

const {
    userMyListing,
    userMyFavs
} = require("../controller/normalControllers/userNoramlController")

router.post("/user/register", register)
router.post("/user/login", login)
router.post("/user/addproperty", auth, addProperty);
router.post("/user/logout", auth, logout)
router.post("/user/profile/addmyfav/:property_id", auth, userMyFav)
router.post("/owner-details/:property_id", auth, userEmailDetails)


// router.delete("/property/delete/:property_id", auth, async (req, res) => {
//     const property_id = req.params.property_id
//     const user = req.user
//     const prop = await Property.findOne({
//         where: {
//             id: property_id
//         }
//     })
//     prop.destroy().then(function (data) {
//         res.status(200).json({
//             message: "Property Deleted Succesfully",

//         })
//     }).catch(function (err) {
//         console.log(err.message)
//     })
// })


router.get("/user/profile/mylisting", auth, userMyListing);
router.get("/myfav", auth, userMyFavs)
// router.delete("/property/delete/:property_id", auth, async (req, res) => {
//     const user = req.user;
//     const property_id = req.params.property_id

//     try {
//         const property = await Property.findOneAndDelete({
//             user: user._id,
//             _id: property_id
//         })

//         if (property == null) {
//             res.status(403).send("You are not allowed to delete this property")
//         } else {
//             res.status(200).json({
//                 massage: "Property deleted successfully",
//                 Property: property
//             })
//         }
//     } catch (err) {
//         res.status(500).send("server error")
//         console.log(err.massage)
//     }
// })

module.exports = router