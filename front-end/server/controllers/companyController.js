const Company = require('../models').Company;
const Job = require('../models').Job;
const Applicants = require('../models').Applicants;
const JobApplications = require('../models').JobApplications;
const jwt = require('jsonwebtoken');

module.exports = {

    createJob(req, res) {
        "use strict";
        console.log("in create jobPost");
        console.log(req.body);
        return Job
            .create({
                title: req.body.title,
                location: {
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip
                },
                description: req.body.description,
                companyId: req.body.companyId
            })
            .then((job) => {
                job.dataValues.Applicants = [];
                return res.status(201).send(job);
            })
            .catch((error) => {
                // console.log(error);
                res.status(400).send(error)
            })
    },

    getJobs(req, res) {
        "use strict";
        console.log("getting jobs");

        return Company
            .findById(req.params.companyId)
            .then(company => {
                return company.getJobs({
                    include: [Applicants]
                })
                    .then(jobs => {
                        console.log("the jobs:", jobs);
                        res.status(201).send(jobs);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(400).send(error);
                    })

            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error)
            });
    },

    updateApplicantStatus(req, res) {
        console.log("inside the company controller with:");
        console.log(req.body);
        console.log(req.params);

        return Applicants
            .update({
                    status: req.body.status,
                    interest: req.body.interest
                },
                {
                    where: {id: req.body.id}
                })
            .then(applicant => {
                console.log("we updated the applicant:", applicant);
                res.status(201).send(applicant);
            })
            .catch(error => {
                console.log(error);
                res.status(400).send(error);
            })

    }
};