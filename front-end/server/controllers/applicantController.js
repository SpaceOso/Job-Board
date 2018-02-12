const JbUser = require('../models').JbUser;
const Employer = require('../models').Employer;
const Applicants = require('../models').Applicants;
const Job = require('../models').Job;
let uuid = require('uuid');

module.exports = {
    create(req, res) {
        "use strict";
        console.log("user created");
        console.log("user information:", req.body);
        console.log("the user files:", req.files);

        let resume = '';
        let coverLetter = '';

        console.log('resume:', req.files.resume);
        console.log('coverLetter', req.files.coverLetter);

        if (req.files.resume !== undefined) {
            resume = req.files.resume[0].filename;
            if (resume === undefined || resume === null) {
                resume = req.files.resume[0].key;
            }
        }

        if (req.files.coverLetter !== undefined) {
            coverLetter = req.files.coverLetter[0].filename;
            if (coverLetter === undefined || coverLetter === null) {
                coverLetter = req.files.coverLetter[0].key;
            }
        }

        console.log('second resume:', resume);
        console.log('second coverLetter:', coverLetter);

        return Applicants
            .create({
                firstName: req.body.fName,
                lastName: req.body.lName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                website: req.body.website,
                resume: resume,
                coverLetter: coverLetter,
                jobId: req.body.jobId,
                employerId: req.body.employerId
            })
            .then((applicant) => {
                //TODO need to add applicant to JobApplications
                console.log('new applicant:', applicant);
                return Job.findById(req.body.jobId)
                    .then(job => {
                        return job.addApplicant(applicant)
                            .then((JobApplication) => {
                                console.log("applicant added..", applicant);
                                res.status(201).send(JobApplication);
                            })

                    })

            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            })
    },

    list(req, res) {
        "use strict";
        console.log('applicant listed');
    }
};