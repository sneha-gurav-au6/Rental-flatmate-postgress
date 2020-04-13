const app = require("./app")
const PORT = PROCESS.ENV.PORT || 5000
app.listen(PORT , () => {
    console.log("server started")
})