const User = require("../../models/user.js")
const Property = require("../../models/property")
const nodemailer = require("nodemailer")
const smtpTransport = require("nodemailer-smtp-transport");
const multiparty = require("multiparty")
const cloudinary = require("cloudinary")
const jwt = require("jsonwebtoken")
module.exports = {
  
    register: async (req, res) => {
        const email = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (email) return res.send("Email is already existed");
        const user = req.body;
        jwt.sign({
                user: user,
            },
            "secret key",
            async (err, token) => {
                try {
                    const data = await User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        phone_number: req.body.phone_number,
                        token: token,
                    });
                    res.status(201).json({
                        message: "You have registered succefully.Your details are as follows",
                        status: 201,
                        user: data,
                    });
                } catch (err) {
                    res.status(500).send(`Validation Error: ${err.message}`);
                }
            }
        );
    },
    
    login: async function (req, res) {
        const {
            email,
            password
        } = req.body;
        if (!email || !password)
            return res.status(400).send("Incorrect credentials");
        try {
            const data = await User.findByEmailAndPassword(email, password)
            var user1 = User.findByPk(
                data.id, {
                    raw: true
                }
            ).then(function (users) {
                jwt.sign({
                    id: data.id
                }, "secret key", {
                    expiresIn: 60 * 60 * 1
                }, (err, token) => {
                    User.update({
                        token: token
                    }, {
                        returning: true,
                        where: {
                            id: data.id
                        }
                    }).then(function (now) {
                        res.status(200).json({
                            message: "Logged in successfully",
                            token: token
                        });

                    }).catch(function (err) {
                        console.log(err.message)
                    })
                })
            })
        } catch (err) {
            console.log(err);
            res.status(401).send("Invalid Credintials");
        }
    },
   
    logout: async (req, res) => {
        const user = req.user;
        try {
            User.update({
                token: null
            }, {
                returning: true,
                where: {
                    id: user.id,
                },
            });
            res.json({
                status: 200,
                message: "logged Out Successfully!! See you Again"
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(`Validation Error: ${err.message}`);
        }
    },
    addProperty: (req, res) => {
        const form = new multiparty.Form({
            uploadDir: "uploads"
        });
        form.parse(req, function (err, fields, files) {
            const property_title = fields.property_title[0]
            const property_rent = fields.property_rent[0]
            const proprty_deposit = fields.proprty_deposit[0]
            const property_type = fields.property_type[0]
            const property_type_gender = fields.property_type_gender[0]
            const property_amenities = fields.property_amenities[0]
            const property_location = fields.property_location[0]
            const propert_possesion = fields.propert_possesion[0]
            const property_area = fields.property_area[0]
            const property_furnish = fields.property_furnish[0]
            const property_address = fields.property_address[0]
            const img = files.property_img[0].path
            cloudinary.uploader.upload(img, function (result, error) {
                if (error) {
                    console.log(error)
                }
                const user = req.user
                User.findByPk(user.id).then(function (user) {
                    const property = Property.create({
                        property_title: property_title,
                        property_rent: property_rent,
                        proprty_deposit: proprty_deposit,
                        property_type: property_type,
                        property_type_gender: property_type_gender,
                        property_amenities: property_amenities,
                        property_location: property_location,
                        propert_possesion: propert_possesion,
                        property_area: property_area,
                        property_furnish: property_furnish,
                        property_address: property_address,
                        property_img: result.secure_url,
                        user: user.id
                    }).then(function (data) {
                        res.json(data)
                    }).catch(function (err) {
                        res.status(401).send("Invalid token")
                        console.log(err.message)
                    })
                    console.log(user.id)
                }).catch(function (err) {
                    res.status(401).send("Invalid token")
                    console.log(err.message)
                })
            }).catch(function (err) {
                res.status(401).send("Invalid token")
                console.log(err.message)
            })
        });
    },

    userMyFav: async (req, res) => {
        const user = req.user;
        const property = req.params.property_id;
        console.log(property)
     try {
            const data = await User.findByPk(user.id, {
                raw: true,
            });
            const data1 = await User.update({
                favourite: property + "," + data.favourite,
            }, {
                returning: true,
                where: {
                    id: user.id,
                },
            });
            res.status(200).json({
                massage: "Property added to your favourite list"
            })
        } catch (err) {
            console.log(err.massage);
            res.status(500).send("server error");
        }
    },
    userEmailDetails: async (req, res) => {
        const user1 = req.user;
        const userid = user1.id;
        try {
            const user1id = await User.findByPk(userid);
         

            const userName = user1id.name;
            const userEMAIL = user1id.email;
        
            const id = req.params.property_id;
            

            const property = await Property.findByPk(id);
            console.log(property);
        
            const name = property.property_title;
            const location = property.property_location;
            const ownerid = property.user;
            const owner = await User.findByPk(ownerid);
           
            const owner_name = owner.name;
            const owner_eamil = owner.email;
            const owner_phone = owner.phone_number;

            var transport = nodemailer.createTransport(
                smtpTransport({
                    service: "Gmail",
                  
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,

                    auth: {
                        user: "guravsneha258@gmail.com",
                        pass: "vlqgurytisbpixrg",
                    },
                })
            );

            const mailoptions = {
                from: "guravsneha258@gmail.com",
                to: userEMAIL,
                subject: "Property Owner details by RentalFlatmates",
                text: `" Hi ${userName},
     You have requested for the property ${name} and location ${location} ,the owner details are given below name:
    owner namea: ${owner_name} ,owner-email address: ${owner_eamil} , owner phone-number:${owner_phone}"`,
            };
           
            transport.sendMail(mailoptions, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("sent mail");
                    res.json(
                        "Owner details for this property has been sent to your email address ,Check your email ."
                    );
                }
            });
            transport
                .verify()
                .then(function (res) {
                    console.log(res);
                })
                .catch(function (error) {
                    console.log(error.massage);
                });
        } catch (err) {
            console.log(err.massage)
            res.send("server error")
        } 
    }
}