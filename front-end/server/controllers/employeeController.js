const JbUser = require('../models').JbUser;
const Company = require('../models').Company;
let bcrypt = require('bcryptjs');
let uuid = require('uuid');
let jwt = require('jsonwebtoken');

const sequelize = require('sequelize');

module.exports = {
    create(req, res) {
        "use strict";
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                // Store hash in your password DB.
                return JbUser
                    .create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash
                    })
                    .then((user) => {
                        let userSignature = {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            companyId: null,
                            id: user.id
                        };

                        let token = jwt.sign(userSignature, process.env.SECRET_KEY, {expiresIn: "1 day"});
                        res.status(201).json({
                            user: userSignature,
                            token: token
                        });
                    })
                    .catch((error) => {
                        res.status(400).send(error);
                    })
            });
        });

    },

    loadOnLogin(req, res) {
        "use strict";
        console.log('loadOnLogin:');
        let token = req.body.token;
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {

            if (err) {
                if (err.message === 'jwt expired') {
                    console.log('we need another token');
                    return res.status(401).json({
                        message: "credentials expired",
                    })
                }
            }

            if (decoded) {
                return JbUser
                    .findById(decoded.id, {
                        include: [Company],
                        plain: true,
                        type: sequelize.QueryTypes.SELECT
                    })
                    .then((response) => {
                            let user = {
                                id: response.dataValues.id,
                                firstName: response.dataValues.firstName,
                                lastName: response.dataValues.lastName,
                                email: response.dataValues.email,
                                companyId: response.dataValues.companyId === undefined ? null : response.dataValues.companyId
                            };

                            let company = null;

                            if (response.Company !== null) {
                                company = {...response.Company.dataValues};
                            }

                            let token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: "2 days"});

                            res.status(200).json({
                                user: user,
                                companyId: user.companyId,
                                company: company,
                                token: token
                            });
                        }
                    )
                    .catch(err => console.log("userPromise error:", err));
            }
        });
    },

    login(req, res, next) {
        "use strict";
        return JbUser
            .find({
                where: {
                    email: req.body.email
                },
                include: [Company]
            })
            .then((userModel) => {
                if (!userModel) {
                    return res.status(500).json({message: "Username or password not valid"});
                }

                if (bcrypt.compareSync(req.body.password, userModel.password) === false) {
                    return res.status(500).json({message: "Username or password not valid"});
                }

                let user = {
                    id: userModel.id,
                    firstName: userModel.firstName,
                    lastName: userModel.lastName,
                    email: userModel.email,
                    companyId: userModel.companyId === undefined ? null : userModel.companyId
                };

                let company = null;

                if (userModel.Company !== null) {
                    company = {...userModel.Company.dataValues};
                }

                let token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: "2 days"});
                res.status(200).json({
                    user,
                    // companyIdentifier: employee.companyIdentifier,
                    company: company,
                    token: token
                });
            })
            .catch((err) => {
                    res.status(404).send(err);
                }
            );
    },

    addCompany(req, res, next) {
        "use strict";
        //checking to see if we have a logoImg uploaded
        let filename = '';

        if (req.file !== undefined) {
            if (req.file.key !== undefined) {
                filename = req.file.key;
            }

            if (req.file.filename !== undefined) {
                filename = req.file.filename;
            }
        }


        return Company
            .create({
                name: req.body.name,
                logoImg: filename,
                location: {
                    address: req.body.address,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip
                },
                website: req.body.website,
                twitter: req.body.twitter,
                facebook: req.body.facebook,
                linkedIn: req.body.linkedIn
            })
            .then((company) => {
                return JbUser.update({companyId: company.id},
                    {
                        where: {id: req.body.employeeId},
                        returning: true,
                        plain: true
                    })
                    .then((user) => {
                        let localUser = {
                            companyId: user[1].companyId,
                            firstName: user[1].firstName,
                            lastName: user[1].lastName,
                            email: user[1].email,
                            id: user[1].id
                        };

                        let localCompany = {
                            name: company.name,
                            logoImg: company.logoImg,
                            id: company.id,
                            jobs: [],
                            website: company.website,
                            twitter: company.twitter,
                            facebook: company.facebook,
                            linkedIn: company.linkedIn,
                            location: company.location,
                        };

                        let token = jwt.sign(localUser, process.env.SECRET_KEY, {expiresIn: "2 days"});

                        res.status(200).json({
                            token,
                            company: localCompany,
                            user: localUser
                        });
                    });
            })
            .catch((error) => {
                res.status(400).send(error);
            });

    },

    list(req, res) {
        "use strict";
        return JbUser
            .findAll({include: [{model: Company}]})
            .then(users => {
                res.status(201).send(users)
            })
            .catch((error) => {
                res.status(400).send(error);
            })
    }
};