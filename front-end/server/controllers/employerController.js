const Employer = require('../models').Employer;
const Job = require('../models').Job;
const Applicants = require('../models').Applicants;
const JobApplications = require('../models').JobApplications;
const jwt = require('jsonwebtoken');

module.exports = {

    createJob(req, res) {
        "use strict";
        console.log("in create job");
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
                employerId: req.body.employerId
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

        return Employer
            .findById(req.params.employerId)
            .then(employer => {
                return employer.getJobs({
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
        console.log("inside the employer controller with:");
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