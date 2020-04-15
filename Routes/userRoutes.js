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


router.get("/user/profile/mylisting", auth, userMyListing);
router.get("/myfav", auth, userMyFavs)


module.exports = router