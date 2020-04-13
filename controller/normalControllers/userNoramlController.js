const User = require("../../models/user");
const Property = require("../../models/property");

module.exports = {
  userProfile: (req, res) => {
    const user = req.user;

    res.send("Hello u got protected" + user);
  },
  userMyListing: async (req, res) => {
    const user = req.user;
    console.log(user.id);
    try {
      const data = await Property.findAll({
        user: user.id,
      });
      console.log(data);
      res.json(data);
    } catch (error) {
      console.log(error.message);
    }
  },
  userMyFavs: async (req, res) => {
    const user = req.user;
    const arr = [];
    try {
      const data = await User.findByPk(user.id);
      const favList = data.favourite;
      const fav1 = favList.split(",");

      for (i = 0; i <= fav1.length; i++) {
        const fav2 = fav1[i] + " ";
        if (fav1[i] !== "null") {
          const user = await Property.findByPk(fav1[i]);
          arr.push(user);
        }
    //    else if (fav1[i] == undefined) {
    //       res.send("Dont have any property addded to your favourite list");
    //     }
      
      }
      console.log(arr);
      res.json(arr);
    } catch (err) {
      console.log(err.massage);
      if (err.message == undefined) {
        res.json({
          message: "You dont have any property added to your favourite list",
          status: 200,
        });
      }
      res.status(500).status("server error");
    }
  },
};
