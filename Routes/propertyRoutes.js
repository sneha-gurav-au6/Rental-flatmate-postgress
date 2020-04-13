const Property = require("../models/property")
const auth = require("../middleware/auth")
const {
    Router
} = require("express")
const {
    propertyFilters,
    getProperty,
    getPropertyDetailsById
} = require("../controller/normalControllers/propertyNormalController")
const {
    updatePropertyByID,
    deletePropertyById
} = require("../controller/apiControllers/propertyApiController")
const router = Router()

router.get("/property", getProperty)
router.get("/property/detail/:property_id", getPropertyDetailsById)

router.post(
    "/property/filter/:location/:type/:gender/:rent",
    propertyFilters
)
router.patch("/property/update/:property_id", auth, updatePropertyByID)

router.delete("/property/delete/:property_id", auth, deletePropertyById)


module.exports = router